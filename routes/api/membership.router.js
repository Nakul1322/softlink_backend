import { Router } from 'express';
import Authenticator from '../../middlewares/auth.middleware';
import MembershipController from '../../controllers/membershipController';
import Validators from '../../validation/index.validation';
import { ROUTES } from '../../helpers/constants';
import Guards from '../../middlewares/guards.middleware';

const router = Router();
const {
  createMembershipGuard,
} = Guards;

const {
  MEMBERSHIP: {
    createMembership,
    updateMembershipData,
    getAllMemberships,
    membershipSubscribersFilter,
    getMembership,
    updateMembership,
    deleteMembership,
    createMembershipAccess,
    updateMembershipAccess,
    createMembershipAccessLevel,
    getMembershipAccessLevels,
    createMembershipContent,
    getMembershipContent,
    createMembershipPost,
    updateMembershipPost,
    updateProgressLevel,
    deleteMembershipPost,
    getMembershipsPosts,
    createMembershipMember,
    getMembershipMembers,
    updateMembershipMember,
    deleteMembershipMember,
    deleteMembershipMemberAccess,
    softDeleteMembershipMemberAccess,
    getAllMembershipsMembers,
    resendMembershipMemberEmail,
    resendMembershipMembersEmails, // '/memberships/:membershipId/emails'
    portalAuthMembership,
    getPortalMember,
    getLeadMembershipsMembers,
    preOrderMembershipPost,
  }
} = ROUTES;

const { isLoggedIn } = Authenticator;

const { createMembershipValidator, createMembershipMemberValidator } = Validators;

router.post(
  portalAuthMembership,
  MembershipController.portalAuth,
);

// router.post(
//   '/memberships/test',
//   isLoggedIn,
//   MembershipController.checkAndAttachMembershipFromProductsApi,
// );

router.post(
  createMembership,
  createMembershipValidator,
  isLoggedIn,
  createMembershipGuard,
  MembershipController.createMembership
);

router.post(
  updateMembershipData,
  createMembershipValidator,
  isLoggedIn,
  //   createMembershipGuard,
  MembershipController.updateMembershipData
);

router.get(
  getAllMemberships,
  isLoggedIn,
  MembershipController.getAllMemberships
);

router.get(
  membershipSubscribersFilter,
  isLoggedIn,
  MembershipController.membershipSubscribersFilter
);

router.get(
  getPortalMember,
  // isLoggedIn,
  MembershipController.getPortalMember,
);

router.get(
  getMembership,
  isLoggedIn,
  MembershipController.getMembership
);

router.patch(
  updateMembership,
  isLoggedIn,
  MembershipController.updateMembership
);

router.delete(
  deleteMembership,
  isLoggedIn,
  MembershipController.deleteMembership
);

router.post(
  createMembershipAccess,
  isLoggedIn,
  // createMembershipAccessValidator,
  MembershipController.createMembershipAccess
);

router.put(
  updateMembershipAccess,
  isLoggedIn,
  // updateMembershipAccessValidator
  MembershipController.updateMembershipAccess
);

router.post(
  createMembershipAccessLevel,
  isLoggedIn,
  // createMembershipAccessValidator
  MembershipController.createMembershipAccessLevel
);

router.get(
  getMembershipAccessLevels,
  isLoggedIn,
  MembershipController.getMembershipAccessLevels
);

router.post(
  createMembershipContent,
  isLoggedIn,
  // createMembershipContentValidator
  MembershipController.createMembershipContent
);

router.get(
  getMembershipContent,
  isLoggedIn,
  MembershipController.getMembershipContent
);

router.post(
  createMembershipPost,
  isLoggedIn,
  // createMembershipPostValidator
  MembershipController.createMembershipPost
);

router.put(
  updateMembershipPost,
  isLoggedIn,
  // createMembershipPostValidator
  MembershipController.updateMembershipPost
);

router.delete(
  deleteMembershipPost,
  isLoggedIn,
  // createMembershipPostValidator
  MembershipController.deleteMembershipPost // membership-access, membership-member, membership-post-comment
);

router.post(
  getMembershipsPosts,
  isLoggedIn,
  MembershipController.getMembershipsPosts
);

router.put(
  updateProgressLevel,
  // isLoggedIn,
  MembershipController.updateProgressLevel
);

router.post(
  createMembershipMember,
  isLoggedIn,
  createMembershipMemberValidator,
  MembershipController.createMembershipMemberApi
);

router.post(
  resendMembershipMemberEmail,
  isLoggedIn,
  MembershipController.sendNewMembershipMemberPassword
);

router.post(
  resendMembershipMembersEmails,
  isLoggedIn,
  MembershipController.sendNewMembershipMembersPasswords
);

router.post(
  preOrderMembershipPost,
  // isLoggedIn,
  MembershipController.preOrderMembershipPost
);

router.get(
  getAllMembershipsMembers,
  isLoggedIn,
  MembershipController.getAllMembershipsMembers
);

router.get(
  getMembershipMembers,
  isLoggedIn,
  MembershipController.getMembershipMembers
);

router.get(
  getLeadMembershipsMembers,
  isLoggedIn,
  MembershipController.getLeadMembershipsMembers
);

router.patch(
  updateMembershipMember,
  isLoggedIn,
  // createMembershipMemberValidator
  MembershipController.updateMembershipMember
);

router.delete(
  deleteMembershipMember,
  isLoggedIn,
  MembershipController.deleteMembershipMember
);

router.delete(
  deleteMembershipMemberAccess,
  isLoggedIn,
  MembershipController.deleteMembershipMemberAccess
);

router.delete(
  softDeleteMembershipMemberAccess,
  isLoggedIn,
  MembershipController.softDeleteMembershipMemberAccess
);

export default router;
