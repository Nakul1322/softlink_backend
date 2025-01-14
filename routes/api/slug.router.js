import { Router } from 'express';
import SlugController from '../../controllers/slugController';
import Authenticator from '../../middlewares/auth.middleware';
import { ROUTES } from '../../helpers/constants';
import Validators from '../../validation/index.validation';

const router = Router();

const { isLoggedIn } = Authenticator;

const {
  SLUGS: {
    addSlug
  }
} = ROUTES;

const { addSlugValidator } = Validators;

router.patch(
  addSlug,
  isLoggedIn,
  addSlugValidator,
  SlugController.addSlug
);

export default router;
