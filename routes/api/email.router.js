import { Router } from 'express';
import EmailController from '../../controllers/emailController';
import { ROUTES } from '../../helpers/constants';
import Authenticator from '../../middlewares/auth.middleware';
// import EmailMiddleware from '../../middlewares/email.middleware';
import Validators from '../../validation/index.validation';
import Guards from '../../middlewares/guards.middleware';

const router = Router();

const { isLoggedIn, hasPaidSubscriptionButExpired } = Authenticator;
const { broadcastAccessGuard } = Guards;

const {
  createEmailValidator,
  editEmailValidator,
  sendEmailValidator,
  emailSubscriptionStatusValidator,
} = Validators;

// const { spamCheck } = EmailMiddleware;

const {
  EMAIL: {
    createEmail,
    deleteEmail,
    deleteEmails,
    sendEmail,
    getAllEmails,
    getEmailHistory,
    editEmail,
    subscriptionStatus,
  }
} = ROUTES;

router.post(
  createEmail,
  isLoggedIn,
  createEmailValidator,
  hasPaidSubscriptionButExpired,
  // spamCheck, // temporarily disabled
  EmailController.createEmail
);

router.delete(
  deleteEmail,
  isLoggedIn,
  EmailController.deleteEmail
);

router.delete(
  deleteEmails,
  EmailController.deleteEmails
);

router.patch(
  sendEmail,
  isLoggedIn,
  // broadcastAccessGuard,
  sendEmailValidator,
  hasPaidSubscriptionButExpired,
  EmailController.sendEmail
);

router.get(
  getAllEmails,
  isLoggedIn,
  EmailController.getAllEmails
);

router.patch(
  editEmail,
  isLoggedIn,
  editEmailValidator,
  hasPaidSubscriptionButExpired,
  EmailController.editEmail
);

router.get(
  getEmailHistory,
  isLoggedIn,
  EmailController.getEmailHistory
);

router.patch(
  subscriptionStatus,
  emailSubscriptionStatusValidator,
  EmailController.subscriptionStatus
);

export default router;
