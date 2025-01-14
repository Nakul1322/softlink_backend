import { Router } from 'express';
import BeneficiaryController from '../../controllers/beneficiaryController';
import Authenticator from '../../middlewares/auth.middleware';
import Validators from '../../validation/index.validation';
import { ROUTES } from '../../helpers/constants';

const router = Router();
const { beneficiaries } = ROUTES;
const { isLoggedIn } = Authenticator;
const { paginationValidator } = Validators;

router.get(
  beneficiaries,
  isLoggedIn,
  paginationValidator,
  BeneficiaryController.getUserBeneficiaries
);

export default router;
