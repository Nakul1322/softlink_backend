import { Router } from 'express';
import TemplateController from '../../controllers/template.controller';
import Authenticator from '../../middlewares/auth.middleware';
import { ROUTES } from '../../helpers/constants';
import Validators from '../../validation/index.validation';

const {
  getTemplatesValidator,
  paginationValidator,
} = Validators;

const router = Router();

const { templates } = ROUTES;
const { isLoggedIn } = Authenticator;

router.get(
  templates,
  isLoggedIn,
  getTemplatesValidator,
  paginationValidator,
  TemplateController.getAll
);

export default router;
