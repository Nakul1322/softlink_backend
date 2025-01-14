import { Router } from 'express';
import NoteController from '../../controllers/noteController';
import Validators from '../../validation/index.validation';
import Auth from '../../middlewares/auth.middleware';
import LeadMiddleware from '../../middlewares/lead.middleware';
import { ROUTES } from '../../helpers/constants';

const router = Router();

const { isLoggedIn } = Auth;

const { addNoteValidator } = Validators;
const { validateLead } = LeadMiddleware;

const {
  NOTES: {
    addNote,
    deleteNote,
  }
} = ROUTES;

router.post(
  addNote,
  isLoggedIn,
  addNoteValidator,
  validateLead,
  NoteController.addNote
);

router.delete(
  deleteNote,
  isLoggedIn,
  NoteController.deleteNote
);

export default router;
