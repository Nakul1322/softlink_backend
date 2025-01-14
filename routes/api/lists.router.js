import { Router } from 'express';
import Authenticator from '../../middlewares/auth.middleware';
import ListController from '../../controllers/listController';
import Validators from '../../validation/index.validation';
import { ROUTES } from '../../helpers/constants';

const router = Router();

const {
  LISTS: {
    createList,
    getLists,
    getList,
    updateList,
    deleteList,
    deleteLists,
  }
} = ROUTES;

const { isLoggedIn } = Authenticator;

const { createListValidator } = Validators;

router.post(
  createList,
  isLoggedIn,
  createListValidator,
  ListController.createList
);

router.get(
  getLists,
  isLoggedIn,
  ListController.getAllLists
);

router.get(
  getList,
  isLoggedIn,
  ListController.getOneList
);

router.patch(
  updateList,
  isLoggedIn,
  ListController.updateList
);

router.delete(
  deleteList,
  isLoggedIn,
  ListController.deleteList
);

router.delete(
  deleteLists,
  isLoggedIn,
  ListController.deleteAllLists
);

export default router;
