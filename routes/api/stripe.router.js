import { Router } from 'express';
import StripeController from '../../controllers/stripeController';
import Authenticator from '../../middlewares/auth.middleware';
import { ROUTES } from '../../helpers/constants';
import Validators from '../../validation/index.validation';

const router = Router();

const { isLoggedIn } = Authenticator;

const {
  createStripeCheckoutSessionValidator,
  createStripePaymentIntentValidator,
} = Validators;

const {
  PAYMENTS: {
    createStripeCustomer,
    createVerifiedStripeCustomer,
    createStripeCheckoutSession,
    createVerifiedStripeCheckoutSession,
    createPaymentIntent,
    createVerifiedPaymentIntent,
    createUserStripeCheckoutSession
  },
} = ROUTES;

router.post(
  createStripeCustomer,
  isLoggedIn,
  StripeController.createStripeCustomer
);

router.post(
  createVerifiedStripeCustomer,
  StripeController.createVerifiedStripeCustomer
);

router.post(
  createPaymentIntent,
  isLoggedIn,
  createStripePaymentIntentValidator,
  StripeController.createPaymentIntent
);

router.post(
  createVerifiedPaymentIntent,
  createStripePaymentIntentValidator,
  StripeController.createVerifiedPaymentIntent
);

router.post(
  createStripeCheckoutSession,
  isLoggedIn,
  createStripeCheckoutSessionValidator,
  StripeController.createStripeCheckoutSession
);

router.post(
  createVerifiedStripeCheckoutSession,
  createStripeCheckoutSessionValidator,
  StripeController.createVerifiedStripeCheckoutSession
);

router.post(
  createUserStripeCheckoutSession,
  // createStripeCheckoutSessionValidator,
  StripeController.createUserStripeCheckoutSession
);

export default router;
