import { execSync } from 'child_process';
import runnableExports from 'runnable-exports';
import Logger from '../logs/winston';
import { PM2 } from '../helpers/constants';

const {
  secretKey,
  publicKey,
  machineName,
} = PM2;

const linkServerToPM2 = () => {
  try {
    execSync(`pm2 link ${secretKey} ${publicKey} ${machineName}`);
    execSync('pm2 install pm2-server-monit');
  } catch (err) {
    Logger.error(err.message);
    process.exit(1);
  }
};

module.exports = linkServerToPM2;

runnableExports();
