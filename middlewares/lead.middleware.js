import StatusCodes from 'http-status-codes';
import Response from '../helpers/responseHelper';
import { GUARDS, MESSAGE } from '../helpers/constants';
import Models from '../models';
import Logger from '../logs/winston';

const { RESOURCE_NOT_FOUND, SERVER_ERROR } = MESSAGE;

const { INTERNAL_SERVER_ERROR, NOT_FOUND } = StatusCodes;

const { Lead } = Models;

export default {
  /**
   * Checks if lead is existing
   * @param {Object} req
   * @param {Object} res
   * @param {*} next
   * @returns {Object} pass on the request body or an error
   */
  validateLead: async (req, res, next) => {
    const {
      user: { username },
      leadId: _id,
    } = req.body;

    try {
      const lead = await Lead.exists({ _id, username });

      return !lead
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

  isCreateOrUpdate: async (req, res, next) => {
    try {
      const { username, email } = req.body;

      // if lead is already existing, then it's an "update", else it's a "create"
      req.body.stage = !(await Lead.exists({ username, email })) ? 'create' : 'update';

      return next();
    } catch (err) {
      Logger.error(err.message);

      return Response.send(res, INTERNAL_SERVER_ERROR, undefined, SERVER_ERROR, 'ERROR');
    }
  },

  limitResultFreeUsers: async (req, res, next) => {

    const { subscriptionPackage, plan } = req.query;

    try {
      const isFreeUser = subscriptionPackage === 'free' && plan === 'limited';
      // const isFreeUser = subscriptionPackage === 'free' && plan === 'infinity';

      if (isFreeUser) {
        req.query.limit = GUARDS.LEADS_LIMIT[subscriptionPackage];
      }

      return next();
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
