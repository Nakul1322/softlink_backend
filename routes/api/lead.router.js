import { Router } from 'express';
import Authenticator from '../../middlewares/auth.middleware';
import Guards from '../../middlewares/guards.middleware';
import LeadMiddleware from '../../middlewares/lead.middleware';
import Validators from '../../validation/index.validation';
import { ROUTES } from '../../helpers/constants';
import LeadController from '../../controllers/leadController';

const router = Router();

const { isLoggedIn, getUsernameFromDomain } = Authenticator;

const { leadsLimitGuard, uploadLeadsGuard } = Guards;

const { isCreateOrUpdate, limitResultFreeUsers } = LeadMiddleware;

const {
  createLeadValidator,
  deleteSomeLeadsValidator,
  verifyLeadsValidator,
  uploadLeadsValidator,
  editLeadValidator,
  editLeadBySelfValidator,
  paginationValidator,
} = Validators;

const {
  LEADS: {
    getLeads,
    getLeadByEmail,
    getTaggedLeads,
    createLead,
    editLead,
    editLeadBySelf,
    deleteOneLead,
    deleteAllLeads,
    deleteSomeLeads,
    verifyLeads,
    uploadLeads,
    downloadLeads,
    getUniqueFields,
  },
} = ROUTES;

router.post(
  createLead,
  createLeadValidator,
  getUsernameFromDomain,
  isCreateOrUpdate,
  leadsLimitGuard,
  LeadController.createLead
);

router.delete(deleteOneLead, isLoggedIn, LeadController.deleteOneLead);

router.delete(deleteAllLeads, isLoggedIn, LeadController.deleteAllLeads);

router.post(
  deleteSomeLeads,
  isLoggedIn,
  deleteSomeLeadsValidator,
  LeadController.deleteSomeLeads
);

router.get(
  getLeads,
  isLoggedIn,
  paginationValidator,
  limitResultFreeUsers,
  LeadController.getLeads
);

router.get(
  getLeadByEmail,
  isLoggedIn,
  LeadController.getLeadByEmail
);

router.get(
  getTaggedLeads,
  isLoggedIn,
  LeadController.getLeadsWithOrWithoutTags
);

router.get(
  getUniqueFields,
  isLoggedIn,
  LeadController.getLeadsAvailiableProperties
);

router.post(
  verifyLeads,
  isLoggedIn,
  verifyLeadsValidator,
  LeadController.sendLeadVerificationCode
);

router.post(
  uploadLeads,
  isLoggedIn,
  uploadLeadsValidator,
  uploadLeadsGuard,
  LeadController.uploadLeads
);

router.patch(editLead, isLoggedIn, editLeadValidator, LeadController.editLead);

router.patch(
  editLeadBySelf,
  editLeadBySelfValidator,
  LeadController.editLeadBySelf
);

router.get(
  downloadLeads, 
  isLoggedIn, 
  LeadController.downloadLeads
);

export default router;
