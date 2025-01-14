import { Router } from "express";
import Authenticator from "../../middlewares/auth.middleware";
import { ROUTES } from "../../helpers/constants";
import Validators from "../../validation/index.validation";
import AppointmentController from "../../controllers/appointmentController";

const router = Router();

const { isLoggedIn, getUserBookingIntegration } = Authenticator;

const { getAllAppointments } = ROUTES.APPOINTMENTS;

const { paginationValidator } = Validators;

router.get(
  getAllAppointments,
  isLoggedIn,
  getUserBookingIntegration,
  paginationValidator,
  AppointmentController.getAllAppointments
);

export default router;
