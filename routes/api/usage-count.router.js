import { Router } from 'express';
import Authenticator from '../../middlewares/auth.middleware';
import UsageCountController from '../../controllers/usageCountController';
import Validators from '../../validation/index.validation';
import { ROUTES } from '../../helpers/constants';
import Guards from '../../middlewares/guards.middleware';

const router = Router();
const {
  createOCPGuard,
} = Guards;

const {
  USAGE_COUNT: {
    createUsageCount,
    createUsageCountMember,
    getAllUsageCount,
    getSingleUsageCount,
    getUsageCountMember,
    getUsageCountMemberEmail,
    updateUsageCount,
    deleteUsageCount,
    updateUsageCountMember,
  }
} = ROUTES;

const { isLoggedIn } = Authenticator;

const { createUsageCountValidator, createUsageCountMemberValidator, updateUsageCountMemberValidator } = Validators;

router.post(
  createUsageCount,
  createUsageCountValidator,
  isLoggedIn,
  createOCPGuard,
  UsageCountController.createUsageCount
);

// router.post(
//   manualUsageCountAccess,
//   createUsageCountValidator,
//   isLoggedIn,
//   createOCPGuard,
//   UsageCountController.manualUsageCountAccess
// );

router.post(
  createUsageCountMember,
  createUsageCountMemberValidator,
  isLoggedIn,
  UsageCountController.createUsageCountMember
);

router.get(
  getAllUsageCount,
  isLoggedIn,
  UsageCountController.getAllUsageCount
);

router.get(
  getSingleUsageCount,
  isLoggedIn,
  UsageCountController.getSingleUsageCount
);

router.get(
  getUsageCountMember,
  UsageCountController.getUsageCountMember
);

router.get(
  getUsageCountMemberEmail,
  isLoggedIn,
  UsageCountController.getUsageCountMemberEmail
);

router.put(
  updateUsageCount,
  createUsageCountValidator,
  isLoggedIn,
  UsageCountController.updateUsageCount
);

router.delete(
  deleteUsageCount,
  isLoggedIn,
  UsageCountController.deleteUsageCount
);

router.put(
  updateUsageCountMember,
  updateUsageCountMemberValidator,
  isLoggedIn,
  UsageCountController.updateUsageCountMember
);

export default router;
