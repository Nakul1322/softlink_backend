import { Router } from 'express';
import Authenticator from '../../middlewares/auth.middleware';
import ListAndTagController from '../../controllers/listAndTagController';
import Validators from '../../validation/index.validation';
import { ROUTES } from '../../helpers/constants';

const router = Router();

const {
  LISTS_AND_TAGS: {
    addListOrTag,
    getListsOrTags,
    newTagCategory,
    getAllTagCategories,
    getOneTagCategory,
    deleteAllTagCategories,
    deleteOneTagCategory,
    renameTagCategory,
    addOrRemoveChildrenTagsFromParentCategory,
  }
} = ROUTES;

const { isLoggedIn } = Authenticator;

const {
  addListsAndTagsValidator,
  newTagCategoryValidator,
  addOrRemoveChildrenTagsFromParentCategoryValidator,
} = Validators;

router.post(
  addListOrTag,
  isLoggedIn,
  addListsAndTagsValidator,
  ListAndTagController.addNewListOrTag
);

router.post(
  newTagCategory,
  isLoggedIn,
  newTagCategoryValidator,
  ListAndTagController.newTagCategory
);

router.get(
  getAllTagCategories,
  isLoggedIn,
  ListAndTagController.getAllTagCategories
);

router.get(
  getOneTagCategory,
  isLoggedIn,
  ListAndTagController.getOneTagCategory
);

router.delete(
  deleteAllTagCategories,
  isLoggedIn,
  ListAndTagController.deleteAllTagCategories
);

router.delete(
  deleteOneTagCategory,
  isLoggedIn,
  ListAndTagController.deleteOneTagCategory
);

router.get(
  getListsOrTags,
  isLoggedIn,
  ListAndTagController.getAllListsOrTags
);

router.patch(
  renameTagCategory,
  isLoggedIn,
  newTagCategoryValidator,
  ListAndTagController.renameTagCategory
);

router.post(
  addOrRemoveChildrenTagsFromParentCategory,
  isLoggedIn,
  addOrRemoveChildrenTagsFromParentCategoryValidator,
  ListAndTagController.addOrRemoveChildrenTagsFromParentCategory
);

export default router;
