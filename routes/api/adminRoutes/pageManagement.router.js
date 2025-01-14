import { Router } from 'express';
import PageController from '../../../controllers/pageController';
import { ROUTES } from '../../../helpers/constants';
import Authenticator from '../../../middlewares/auth.middleware';

const router = Router();
const { restructureDB } = ROUTES;

const { isSuperAdmin } = Authenticator;

router.patch(
  restructureDB,
  isSuperAdmin,
  PageController.restructurePageTable
);

export default router;
