import { Router } from 'express';
import CustomDomainController from '../../controllers/customDomainController';
import Authenticator from '../../middlewares/auth.middleware';
import { ROUTES } from '../../helpers/constants';
import Validators from '../../validation/index.validation';
import Guards from '../../middlewares/guards.middleware';

const router = Router();

const { isLoggedIn } = Authenticator;
const {
  subscriptionAccessGuard,
  domainsLimitGuard,
} = Guards;

const {
  DOMAINS: {
    addCustomDomain,
    addCustomSubDomain,
    getAllCustomDomains,
    getAllCustomSubDomains,
    deleteCustomDomain,
    deleteCustomSubDomain,
    assignHomePage,
    unAssignHomePage,
  }
} = ROUTES;

const {
  customDomainValidator,
  paginationValidator,
  assignHomePageValidator,
  unAssignHomePageValidator,
} = Validators;

router.post(
  addCustomDomain,
  // isLoggedIn,
  // subscriptionAccessGuard,
  // customDomainValidator,
  // domainsLimitGuard,
  CustomDomainController.addCustomDomain
);

router.post(
  addCustomSubDomain,
  // isLoggedIn,
  // subscriptionAccessGuard,
  // customDomainValidator,
  // domainsLimitGuard,
  CustomDomainController.addCustomSubDomain
);

router.get(
  getAllCustomDomains,
  isLoggedIn,
  subscriptionAccessGuard,
  paginationValidator,
  CustomDomainController.getAllCustomDomains
);

router.get(
  getAllCustomSubDomains,
  // isLoggedIn,
  // subscriptionAccessGuard,
  // paginationValidator,
  CustomDomainController.getAllCustomSubDomains
);

router.delete(
  deleteCustomDomain,
  isLoggedIn,
  subscriptionAccessGuard,
  CustomDomainController.deleteCustomDomain
);

router.delete(
  deleteCustomSubDomain,
  // isLoggedIn,
  // subscriptionAccessGuard,
  CustomDomainController.deleteCustomSubDomain
);

router.patch(
  assignHomePage,
  isLoggedIn,
  assignHomePageValidator,
  CustomDomainController.assignHomePage
);

router.patch(
  unAssignHomePage,
  isLoggedIn,
  unAssignHomePageValidator,
  CustomDomainController.unAssignHomePage
);

export default router;
