import 'core-js/stable';
import 'regenerator-runtime/runtime';

import childProcess from 'child_process';
import cors from 'cors';
import socketIO from 'socket.io';
import express from 'express';
import RateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import morgan from 'morgan';
import StatusCodes from 'http-status-codes';
import compression from 'compression';
import http from 'http';
import Logger from './logs/winston';
import v1Router from './routes';
import Response from './helpers/responseHelper';
import { checkForToken, isTokenBlacklisted } from './helpers/utils';
import { NODE, COOKIE, MESSAGE } from './helpers/constants';
import configs from './configs';
import SessionTracker from './controllers/sessionController';

const { FORBIDDEN, INTERNAL_SERVER_ERROR, NOT_FOUND } = StatusCodes;

const { redis } = configs;
const { port } = NODE;
const { secretKey } = COOKIE;
const {
  TOO_MANY_REQUESTS,
  SERVER_ERROR,
  ROUTE_NOT_FOUND,
  REQUEST_REJECTED,
  SOCKET_CLIENT_CONNECTED,
  SOCKET_CLIENT_DISCONNECTED,
} = MESSAGE;

const oldSpawn = childProcess.exec;

childProcess.exec = () => {
  Logger.info('spawn called');
  Logger.info(arguments);
  return oldSpawn.apply(this, arguments);
};

// Set up the express app
const app = express();

const apiLimiter = new RateLimit({
  store: new RedisStore({
    client: redis,
  }),
  windowMs: 5 * 60 * 1000, // 5 minutes
  delayMs: 0,
  max: 100,
  message: TOO_MANY_REQUESTS,
});

app.use(helmet());
app.set('trust proxy', 1);
app.use(cors());
app.use((req, res, next) => {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});
app.use(compression());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser(secretKey));
app.use(
  morgan(':remote-addr - [:date] :method :url :status - :response-time ms', {
    stream: Logger.stream,
  })
);
// app.use(apiLimiter);
app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
});

app.use(
  fileUpload({
    useTempFiles: true,
    safeFileNames: /\\/g,
    preserveExtension: true,
  })
);

// check the Redis store for blacklisted tokens and deny access
app.use(async (req, res, next) => {
  const token = await checkForToken(req);
  if (token) {
    // check if token is blacklisted

    const result = await isTokenBlacklisted(token);
    // if token is blacklisted, reject the request
    if (result) {
      return Response.send(res, FORBIDDEN, undefined, REQUEST_REJECTED, 'ERROR');
    }
  }
  // allow access if route is either unrestricted or token is not blacklisted
  next();
});

// session tracker base on user request to the backend service
app.use('/api/v1', SessionTracker.tracking);

app.use('/api/v1', v1Router);

// Error handling
app.use((req, res, next) => {
  const err = new Error(ROUTE_NOT_FOUND);
  err.status = NOT_FOUND;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  Logger.error(
    `${err.status || INTERNAL_SERVER_ERROR} - ${err.message} - ${
      req.originalUrl
    } - ${req.method} - ${req.ip}`
  );

  Response.send(
    res,
    err.status || INTERNAL_SERVER_ERROR,
    undefined,
    err.message || SERVER_ERROR,
    'ERROR'
  );

  next();
});

process.send = process.send || (() => {});

const server = http.createServer(app);
const io = socketIO(server);

io.on('connect', (socket) => {
  Logger.info(`${SOCKET_CLIENT_CONNECTED}, ${socket.id}`);

  io.to(socket.id).emit('welcome', {
    message: `Hello from server: ${new Date()}`,
  });

  socket.on('disconnect', () => {
    Logger.info(`${SOCKET_CLIENT_DISCONNECTED}, ${socket.id}`);
  });
});

server.listen(port, () => {
  Logger.info(`Server is running at http://localhost:${port}/api/v1`);
  process.send('ready');
});

export default app;
