/* eslint-disable quotes */
import { Router } from "express";
import OCPController from "../../controllers/ocpController";
import Authenticator from "../../middlewares/auth.middleware";
import { ROUTES } from "../../helpers/constants";
import Validators from "../../validation/index.validation";

const router = Router();

const { isLoggedIn, getUsernameFromDomain } = Authenticator;

const {
  OCP: {
    createOCP,
    updateOCP,
    getUserOCP,
    getSingleOCP,
    deleteOCP,
    cancelSubscription,
    getAllUserProductAndOCP,
  },
} = ROUTES;

const { createOCPValidator, getOneOCP } = Validators;

router.post(
  createOCP,
  createOCPValidator,
  isLoggedIn,
  OCPController.createOCP
);

router.put(
  updateOCP,
  createOCPValidator,
  isLoggedIn,
  OCPController.updateOCP
);

router.get(
  getUserOCP,
  isLoggedIn,
  OCPController.getUserOCP
);

router.get(
  getAllUserProductAndOCP,
  isLoggedIn,
  OCPController.getAllUserProductAndOCP
);

router.post(
  getSingleOCP,
  getOneOCP,
  getUsernameFromDomain,
  OCPController.getSingleOCP
);

router.post(
  cancelSubscription,
  OCPController.cancelOCPSubscription
);

router.delete(
  deleteOCP,
  isLoggedIn,
  OCPController.deleteOCP
);

export default router;
