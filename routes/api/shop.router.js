import { Router } from 'express';
import ShopController from '../../controllers/shopController';
import Authenticator from '../../middlewares/auth.middleware';
import { ROUTES } from '../../helpers/constants';
import Validators from '../../validation/index.validation';
import Guards from '../../middlewares/guards.middleware';

const router = Router();

const { isLoggedIn, getUsernameFromDomain } = Authenticator;
const { shopsLimitGuard } = Guards;

const {
  SHOPS: {
    createShop, deleteShop, editShop, getOneShop, getAllShops, makeShopMigration
  },
} = ROUTES;

const {
  createShopValidator,
  getOneShopValidator,
  deleteShopValidator,
  editShopValidator,
  paginationValidator,
} = Validators;

router.post(
  createShop,
  isLoggedIn,
  createShopValidator,
  shopsLimitGuard,
  ShopController.createShop
);

router.get(
  makeShopMigration,
  ShopController.makeShopMigration
);

router.delete(
  deleteShop,
  isLoggedIn,
  deleteShopValidator,
  ShopController.deleteShop
);

router.patch(editShop, isLoggedIn, editShopValidator, ShopController.editShop);

router.post(
  getOneShop,
  getOneShopValidator,
  getUsernameFromDomain,
  ShopController.getOneShop
);

router.get(
  getAllShops,
  isLoggedIn,
  paginationValidator,
  ShopController.getAllShops
);

export default router;
