import { Router } from 'express';
import PaymentIntegrationController from '../../controllers/paymentIntegration.controller';
import Authenticator from '../../middlewares/auth.middleware';
import { ROUTES } from '../../helpers/constants';
import Validators from '../../validation/index.validation';

const router = Router();

const { isLoggedIn } = Authenticator;

const { addIntegrationValidator, paginationValidator } = Validators;

const {
  testTruelayer,
  addIntegration,
  getAllIntegrations,
  deleteIntegration,
  getOneIntegration,
  webhooks: { flutterwave, paystack },
} = ROUTES;

router.post(
  testTruelayer,
  PaymentIntegrationController.testTruelayer
);

router.post(
  addIntegration,
  isLoggedIn,
  addIntegrationValidator,
  PaymentIntegrationController.addIntegration
);

router.get(
  getAllIntegrations,
  isLoggedIn,
  paginationValidator,
  PaymentIntegrationController.getAllIntegrations
);

router.delete(
  deleteIntegration,
  isLoggedIn,
  PaymentIntegrationController.deleteIntegration
);

router.get(
  getOneIntegration,
  isLoggedIn,
  PaymentIntegrationController.getOneIntegration
);

router.post(flutterwave, PaymentIntegrationController.listenFlutterwaveWebhook);

router.post(paystack, PaymentIntegrationController.listenPaystackWebhook);

export default router;
