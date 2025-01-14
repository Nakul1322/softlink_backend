/* eslint-disable no-unused-vars */
import { Router } from 'express';
import profileController from '../../controllers/profileController';
import Authenticator from '../../middlewares/auth.middleware';
import Validators from '../../validation/index.validation';
import { ROUTES } from '../../helpers/constants';

const router = Router();

const { isLoggedIn } = Authenticator;

const { editDeliveryFeesValidator, addPickupAddressValidator, editPickupAddressValidator } = Validators;

const {
  PROFILE: {
    editProfile,
    changePassword,
    uploadProfilePicture,
    getProfile,
    saveBusinessDetails,
    editDeliveryFees,
    addPickupAddress,
    deletePickupAddress,
  },
} = ROUTES;

router.post(editProfile, isLoggedIn, profileController.editProfile);

router.get(getProfile, profileController.getProfile);

router.post(
  uploadProfilePicture,
  isLoggedIn,
  profileController.uploadProfilePicture
);

router.patch(changePassword, isLoggedIn, profileController.changePassword);

router.put(
  saveBusinessDetails,
  isLoggedIn,
  profileController.saveBusinessDetails
);

router.patch(
  editDeliveryFees,
  isLoggedIn,
  editDeliveryFeesValidator,
  profileController.editDeliveryFees
);

router.post(
  addPickupAddress,
  isLoggedIn,
  addPickupAddressValidator,
  profileController.addPickupAddress
);

router.delete(
  deletePickupAddress,
  isLoggedIn,
  profileController.deletePickupAddress
);

export default router;
