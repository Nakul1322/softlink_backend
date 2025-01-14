import { Router } from 'express';

import UserController from '../../../controllers/userController';
import { ROUTES } from '../../../helpers/constants';
import Authenticator from '../../../middlewares/auth.middleware';
import Validator from '../../../validation/index.validation';

const router = Router();
const {
  grantAccess,
  addAffiliateBalance,
  changeSubscriptionPackage,
} = ROUTES;

const { isSuperAdmin } = Authenticator;

const {
  grantUserAccessValidator,
  affiliateBalanceValidator,
  changeSubscriptionValidator,
} = Validator;

router.post(
  grantAccess,
  isSuperAdmin,
  grantUserAccessValidator,
  UserController.grantUserAccess,
);

router.post(
  addAffiliateBalance,
  isSuperAdmin,
  affiliateBalanceValidator,
  UserController.addAffiliateBalance,
);

router.post(
  changeSubscriptionPackage,
  isSuperAdmin,
  changeSubscriptionValidator,
  UserController.changeSubscription
);

export default router;
