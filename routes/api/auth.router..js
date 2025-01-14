/* eslint-disable object-curly-newline */
import { Router } from 'express';
import AuthController from '../../controllers/authController';
import Validators from '../../validation/index.validation';
import Auth from '../../middlewares/auth.middleware';
import { ROUTES } from '../../helpers/constants';

const router = Router();
const { isReferrerValid, isLoggedIn, checkForExistingUser, checkForExistingUserUpdate } = Auth;

const {
  signup,
  createTemplatedEmail,
  updateRegister,
  login,
  confirmAccount,
  forgotPassword,
  resetPassword,
  workspace,
  resendEmailVerification,
  logout,
  makeUserChanges,
  updateUserDetails,
  unsubscribeMe,
} = ROUTES;

const {
  userRegistrationValidator,
  userLoginValidator,
  confirmAccountValidator,
  forgotPasswordValidator,
  resetPasswordValidator,
  workspaceValidator,
} = Validators;

router.post(
  signup,
  userRegistrationValidator,
  checkForExistingUser,
  isReferrerValid,
  AuthController.register
);

router.post(
  createTemplatedEmail,
  AuthController.createTemplatedEmail
);

router.post(
  updateRegister,
  userRegistrationValidator,
  checkForExistingUserUpdate,
  isReferrerValid,
  AuthController.updateRegister
);

router.post(workspace, workspaceValidator, AuthController.workspace);

router.post(
  login,
  userLoginValidator,
  AuthController.login
);

router.post(
  confirmAccount,
  confirmAccountValidator,
  AuthController.confirmUser
);

router.post(
  forgotPassword,
  forgotPasswordValidator,
  AuthController.sendPasswordResetCode
);

router.get(
  resendEmailVerification,
  isLoggedIn,
  AuthController.resendEmailVerification
);

router.patch(
  resetPassword,
  resetPasswordValidator,
  AuthController.resetPassword
);

router.get(
  makeUserChanges,
  AuthController.makeUserChanges
);

router.post(
  logout, 
  isLoggedIn, 
  AuthController.logout
);

router.put(
  updateUserDetails, 
  isLoggedIn, 
  AuthController.updateUserDetails
);

router.get(
  `${unsubscribeMe}/:id`, 
  AuthController.unsubscribeMe
);

export default router;
