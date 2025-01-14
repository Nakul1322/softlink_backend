/* eslint-disable object-curly-newline */
import { Router } from 'express';

import Validators from '../../validation/index.validation';
import AffiliateController from '../../controllers/affiliateController';
import Authenticator from '../../middlewares/auth.middleware';
import { ROUTES } from '../../helpers/constants';

const router = Router();

const { isLoggedIn } = Authenticator;
const { createAffiliateSchemaValidator } = Validators;
const { AFFILIATES } = ROUTES;
const { referrals, addAffiliate, getUserAffiliates, getMyAffiliates, getAffiliateByID, deleteAAffiliate, affiliateCount, addAffiliateView } = AFFILIATES; // getAffiliatesByProductID

router.get(
  referrals,
  isLoggedIn,
  AffiliateController.getAllReferrals
);

router.post(
  addAffiliate,
  isLoggedIn,
  createAffiliateSchemaValidator,
  AffiliateController.addAffiliate
);

router.get(
  getUserAffiliates,
  isLoggedIn,
  AffiliateController.getUserAffiliates
);

router.get(
  getMyAffiliates,
  isLoggedIn,
  AffiliateController.getMyAffiliates
);

router.get(
  getAffiliateByID,
  isLoggedIn,
  AffiliateController.getAffiliateByID
);

router.delete(
  deleteAAffiliate,
  isLoggedIn,
  AffiliateController.deleteAffiliate
);

router.get(
  affiliateCount,
  isLoggedIn,
  AffiliateController.affiliateCount
);

router.post(
  addAffiliateView,
  AffiliateController.addAffiliateView
);

export default router;
