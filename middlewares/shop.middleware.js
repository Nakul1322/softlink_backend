import StatusCodes from 'http-status-codes';
import Response from '../helpers/responseHelper';
import { MESSAGE } from '../helpers/constants';
import Models from '../models';
import Logger from '../logs/winston';

const { RESOURCE_NOT_FOUND, SERVER_ERROR } = MESSAGE;

const { INTERNAL_SERVER_ERROR, NOT_FOUND } = StatusCodes;

const { Shop } = Models;

export default {
  /**
   * Checks if shop is existing
   * @param {Object} req
   * @param {Object} res
   * @param {*} next
   * @returns {Object} pass on the request body or an error
   */
  validateShop: async (req, res, next) => {
    const { shopId: _id } = req.body;

    try {
      const shop = await Shop.exists({ _id });

      return !shop
        ? Response.send(res, NOT_FOUND, undefined, RESOURCE_NOT_FOUND, 'ERROR')
        : next();
    } catch (err) {
      Logger.error(err.message);
      return Response.send(res, INTERNAL_SERVER_ERROR, undefined, SERVER_ERROR, 'ERROR');
    }
  },
};
