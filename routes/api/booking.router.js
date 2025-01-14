import { Router } from 'express';

import Authenticator from '../../middlewares/auth.middleware';
import { ROUTES } from '../../helpers/constants';
import Validators from '../../validation/index.validation';
import BookingController from '../../controllers/bookingController';

const router = Router();

const { isLoggedIn, getUserBookingIntegration } = Authenticator;

const { getAllBookings, createBookingSchedule, getAllBlogs } = ROUTES.BOOKINGS;

const { paginationValidator, bookingScheduleValidator } = Validators;

router.post(createBookingSchedule, bookingScheduleValidator, getUserBookingIntegration, BookingController.createBookingSchedule);

router.get(
  getAllBookings,
  isLoggedIn,
  getUserBookingIntegration,
  paginationValidator,
  BookingController.getAllBookings
);

router.get(
  getAllBlogs,
  BookingController.getAllBlogs
);

export default router;
