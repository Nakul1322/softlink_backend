import StatusCodes from 'http-status-codes';
import { isEmpty } from 'lodash';
import Response from '../helpers/responseHelper';
import { MESSAGE } from '../helpers/constants';
import Models from '../models';
import Logger from '../logs/winston';

const {
  SERVER_ERROR,
  ORDER_QUANTITY_MISMATCH,
  ITEM_PRICING_MISMATCH,
  RESOURCE_NOT_FOUND,
} = MESSAGE;

const { INTERNAL_SERVER_ERROR, UNPROCESSABLE_ENTITY, NOT_FOUND } = StatusCodes;

const { Order } = Models;

export default {
  /**
   * Validates the order
   * @param {Object} req
   * @param {Object} res
   * @param {*} next
   * @returns {Object} pass on the request body or an error
   */
  validateOrder: async (req, res, next) => {
    const {
      products, total, quantity, deliveryFee, subTotal
    } = req.body;

    let cartTotal = 0;
    const errors = [];

    try {
      const productsQuantity = products.reduce((acc, item) => {
        // item.quantity is an item amount to buy
        acc += item.quantity;
        return acc;
      }, 0);

      // validate amount of products ordered
      if (quantity !== productsQuantity) errors.push(ORDER_QUANTITY_MISMATCH);

      products.forEach((product) => {
        cartTotal += product.subTotal;
      });

      // validate cart subTotal
      if (cartTotal !== subTotal) { errors.push(ITEM_PRICING_MISMATCH.replace('%ITEM%', 'Sub-total')); }

      // validate cart total
      if (total !== subTotal + deliveryFee) { errors.push(ITEM_PRICING_MISMATCH.replace('%ITEM%', 'Total')); }

      return !isEmpty(errors)
        ? Response.send(res, UNPROCESSABLE_ENTITY, undefined, errors, 'ERROR')
        : next();
    } catch (err) {
      Logger.error(err.message);

      return Response.send(
        res,
        INTERNAL_SERVER_ERROR,
        undefined,
        SERVER_ERROR,
        'ERROR'
      );
    }
  },

  /**
   * Get important order data
   * @param {Object} req
   * @param {Object} res
   * @param {*} next
   * @returns {Object} pass on the request body or an error
   */
  getImportantOrderData: async (req, res, next) => {
    const { orderId: _id } = req.params;
    const { username } = req.body.user;

    try {
      req.body.orderInfo = await Order.findOne(
        { _id, username },
        { customer: 1 }
      );

      return !req.body.orderInfo
        ? Response.send(res, NOT_FOUND, undefined, RESOURCE_NOT_FOUND, 'ERROR')
        : next();
    } catch (err) {
      Logger.error(err.message);

      return Response.send(
        res,
        INTERNAL_SERVER_ERROR,
        undefined,
        SERVER_ERROR,
        'ERROR'
      );
    }
  },
};
