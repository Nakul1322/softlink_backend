import { Router } from 'express';
import { serve, setup } from 'swagger-ui-express';
import HomeController from '../../controllers/home.controller';
import swaggerDocument from '../../api-docs/swagger.json';
import { ROUTES } from '../../helpers/constants';

const { apiDocs, home } = ROUTES;
const router = Router();

const options = {
  explorer: true,
};

router.use((req, res, next) => {
  next();
});
router.get(home, HomeController.helloWorld);
router.use(apiDocs, serve);
router.get(apiDocs, setup(swaggerDocument, options));

export default router;
