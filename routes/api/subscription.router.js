import { Router } from 'express';
import SubscriptionController from '../../controllers/subscriptionController';
import { ROUTES } from '../../helpers/constants';
import Authenticator from '../../middlewares/auth.middleware';
import SubscriptionMiddleware from '../../middlewares/subscription.middleware';
import Validators from '../../validation/index.validation';

const router = Router();

const {
  SUBSCRIPTION: {
    subscribe,
    cancelSubscription,
    subscriptionSpecialActions,
    updateCardDetails,
    getCardDetails,
    deleteCard,
    getSubscriptionHistory,
    submitExtensionRequest,
    getActiveSubscriptionStatus,
  },
} = ROUTES;

const { isLoggedIn } = Authenticator;

const {
  preventDuplicates,
  validateActiveSubscription,
  confirmUpgradeOrDowngrade,
  validateSubscriptionId,
} = SubscriptionMiddleware;

const {
  subscriptionValidator,
  subscriptionSpecialActionsValidator,
  updateCardValidator,
  getActiveSubscriptionValidator,
} = Validators;

router.post(
  subscribe,
  isLoggedIn,
  subscriptionValidator,
  preventDuplicates,
  confirmUpgradeOrDowngrade,
  SubscriptionController.subscribe
);

router.post(
  subscriptionSpecialActions,
  isLoggedIn,
  subscriptionSpecialActionsValidator,
  validateSubscriptionId,
  SubscriptionController.subscriptionSpecialActions
);

router.patch(
  updateCardDetails,
  isLoggedIn,
  updateCardValidator,
  SubscriptionController.updateCard
);

router.get(
  getCardDetails, 
  isLoggedIn, 
  SubscriptionController.getAllCards
);

router.delete(deleteCard, isLoggedIn, SubscriptionController.deleteCard);

router.delete(
  cancelSubscription,
  isLoggedIn,
  SubscriptionController.cancelSubscriptionApi
);

router.get(
  getSubscriptionHistory,
  isLoggedIn,
  SubscriptionController.getSubscriptionHistory
);

router.post(
  submitExtensionRequest,
  isLoggedIn,
  SubscriptionController.submitExtensionRequest
);

router.get(
  getActiveSubscriptionStatus,
  isLoggedIn,
  getActiveSubscriptionValidator,
  validateActiveSubscription,
  SubscriptionController.getActiveSubscriptionStatus
);

export default router;
