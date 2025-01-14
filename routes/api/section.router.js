import { Router } from 'express';
import Authenticator from '../../middlewares/auth.middleware';
import SectionController from '../../controllers/section.controller';
import Validators from '../../validation/index.validation';
import { ROUTES } from '../../helpers/constants';

const router = Router();

const {
  SECTIONS: {
    addSection,
    deleteSection,
    getSection,
    getAllSections,
    addOrRemoveSubsection,
    editSection,
    editSubsection,
  }
} = ROUTES;

const { isLoggedIn } = Authenticator;

const {
  addSectionValidator,
  addOrRemoveSubsectionValidator,
} = Validators;

router.post(
  addSection,
  isLoggedIn,
  addSectionValidator,
  SectionController.addSection
);

router.get(
  getSection,
  isLoggedIn,
  SectionController.getSection
);

router.put(
  deleteSection,
  isLoggedIn,
  SectionController.deleteSection
);

router.get(
  getAllSections,
  isLoggedIn,
  SectionController.getAllSections
);

router.patch(
  addOrRemoveSubsection,
  isLoggedIn,
  addOrRemoveSubsectionValidator,
  SectionController.addOrRemoveSubsection
);

router.patch(
  editSection,
  isLoggedIn,
  SectionController.editSection
);

router.patch(
  editSubsection,
  isLoggedIn,
  SectionController.editSubsection
);

export default router;
