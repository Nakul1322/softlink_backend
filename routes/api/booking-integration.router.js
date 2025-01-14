import { Router } from 'express';
import BookingIntegrationController from '../../controllers/bookingIntegration.controller';
import Authenticator from '../../middlewares/auth.middleware';
import { ROUTES } from '../../helpers/constants';
import Validators from '../../validation/index.validation';

const router = Router();

const { isLoggedIn } = Authenticator;

const {
  addBookingIntegrationValidator,
  checkBookingIntegrationValidator,
  paginationValidator
} = Validators;

const {
  addBookingIntegration,
  getBookingAllIntegrations,
  checkingBookingAllIntegrations,
  deleteBookingIntegration,
  getOneBookingIntegration,
} = ROUTES.bookingIntegration;

router.post(
  addBookingIntegration,
  isLoggedIn,
  addBookingIntegrationValidator,
  BookingIntegrationController.addIntegration,
);

router.get(checkingBookingAllIntegrations,
  checkBookingIntegrationValidator,
  BookingIntegrationController.checkBookingIntegration)
  
router.get(
  getBookingAllIntegrations,
  isLoggedIn,
  paginationValidator,
  BookingIntegrationController.getAllIntegrations,
);

router.delete(
  deleteBookingIntegration,
  isLoggedIn,
  BookingIntegrationController.deleteIntegration
);

router.get(
  getOneBookingIntegration,
  isLoggedIn,
  BookingIntegrationController.getOneIntegration
);

export default router;
