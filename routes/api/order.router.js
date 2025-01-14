/* eslint-disable object-curly-newline */
import { Router } from 'express';
import OrderController from '../../controllers/orderController';
import { ROUTES } from '../../helpers/constants';
import Validators from '../../validation/index.validation';
import ProductMiddleware from '../../middlewares/product.middleware';
import OrderMiddleware from '../../middlewares/order.middleware';
import Authenticator from '../../middlewares/auth.middleware';

const router = Router();

const { validateProduct } = ProductMiddleware;

const { validateOrder, getImportantOrderData } = OrderMiddleware;

const { isLoggedIn, getUsernameFromDomain } = Authenticator;

const {
  ORDERS: { createOrder, createOCPOrder, getAllOrders, getOrderID, modifyOrderStatus, getAllOrdersCount, getRecurringOCPCount },
} = ROUTES;

const { createOrderValidator, paginationValidator, modifyOrderStatusValidator } = Validators;

router.post(
  createOrder,
  createOrderValidator,
  getUsernameFromDomain,
  validateProduct,
  validateOrder,
  OrderController.createOrder
);

router.get(
  getAllOrders,
  isLoggedIn,
  paginationValidator,
  OrderController.getAllOrders
);

router.get(
  getOrderID,
  OrderController.getOrderID
);

router.get(
  getAllOrdersCount,
  isLoggedIn,
  OrderController.getAllOrdersCount
);

router.get(
  getRecurringOCPCount,
  isLoggedIn,
  OrderController.getRecurringOCPCount
);

router.patch(
  modifyOrderStatus,
  isLoggedIn,
  modifyOrderStatusValidator,
  getImportantOrderData,
  OrderController.modifyOrderStatus
);

router.post(
  createOCPOrder,
  createOrderValidator,
  getUsernameFromDomain,
  validateOrder,
  OrderController.createOCPOrder
);

export default router;
