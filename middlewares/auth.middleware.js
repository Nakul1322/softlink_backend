/* eslint-disable no-shadow */
import StatusCodes from 'http-status-codes';
import { checkForToken, verifyJWT } from '../helpers/utils';
import { MESSAGE, SUPERADMIN } from '../helpers/constants';
import Models from '../models';
import Response from '../helpers/responseHelper';
import Logger from '../logs/winston';
import { getDataFromRedis } from '../helpers/utils';

const {
  UNAUTHORIZED_ACCESS,
  RESOURCE_NOT_FOUND,
  INVALID_REFERRER,
  SERVER_ERROR,
  REGISTRATION_CONFLICT,
  NO_BOOKING_INTEGRATION_FOUND,
  RENEW_YOUR_SUBSCRIPTION,
} = MESSAGE;

const {
  UNAUTHORIZED,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  CONFLICT,
} = StatusCodes;

const { email, password, apiKey } = SUPERADMIN;

const { User, Domain, BookingIntegration } = Models;

export default {
  /**
   * Checks to see if the user is logged in
   * @param {Object} req - data pass from the token
   * @param {Object} res - response passed back
   * @param {*} next
   * @returns {Object} pass on the request body or an error
   */
  isLoggedIn: async (req, res, next) => {
    const token = await checkForToken(req);
    if (!token) return Response.send(res, UNAUTHORIZED, undefined, UNAUTHORIZED_ACCESS, 'ERROR');
    try {
      // verify the token...
      const claim = await verifyJWT(token);

      const { _id } = claim;

      // check if the user exists
      const user = await User.findOne({ _id }, { password: 0 });

      if (!user) return Response.send(res, NOT_FOUND, undefined, RESOURCE_NOT_FOUND, 'ERROR');

      // add true data from db AND NOT TOKEN claims
      req.body.user = { ...user._doc };

      return next();
    } catch (err) {
      Logger.error(err.message);

      return Response.send(res, INTERNAL_SERVER_ERROR, undefined, err.message, 'ERROR');
    }
  },

  hasPaidSubscriptionButExpired: async(req, res, next) => {
    const mySubPackage = await getDataFromRedis(`${req.headers.authorization.split(' ')[1].substr(-20)}_universalSubscriptionPackage`);
    const myExpiryDate = new Date(await getDataFromRedis(`${req.headers.authorization.split(' ')[1].substr(-20)}_universalSubscriptionExpiry`));
    
    if(mySubPackage !== 'free' && myExpiryDate < new Date()) {
      // then we must revoke access
      return Response.send(res, UNAUTHORIZED, undefined, RENEW_YOUR_SUBSCRIPTION, 'ERROR');      
    }
    next();
  },

  /**
   * Checks if request is being sent from a superAdmin
   * @param {Object} req - data pass from the request
   * @param {Object} res - response passed back
   * @param {*} next
   * @returns {Object} pass on the request body or an error
   */
  isSuperAdmin: async (req, res, next) => {
    const {
      'api-key': suppliedAPIKey,
      email: suppliedEmail,
      password: suppliedPassword,
    } = req.headers;

    if (
      suppliedEmail === email
      && suppliedPassword === password
      && suppliedAPIKey === apiKey
    ) {
      return next();
    }

    return Response.send(
      res,
      UNAUTHORIZED,
      undefined,
      UNAUTHORIZED_ACCESS,
      'ERROR'
    );
  },

  checkForExistingUser: async (req, res, next) => {
    const { username, email, phoneNumber } = req.body;

    try {
      const user = await User.exists({
        $or: [{ username }, { email }, { phoneNumber }],
      });

      return user
        ? Response.send(
          res,
          CONFLICT,
          undefined,
          REGISTRATION_CONFLICT,
          'ERROR'
        )
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

  checkForExistingUserUpdate: async (req, res, next) => {
    const { username, phoneNumber } = req.body;

    try {
      const user = await User.exists({
        $or: [{ username }, { phoneNumber }],
      });

      return user
        ? Response.send(res, CONFLICT, undefined, REGISTRATION_CONFLICT, 'ERROR')
        : next();
    } catch (err) {
      Logger.error(err.message);

      return Response.send(res, INTERNAL_SERVER_ERROR, undefined, SERVER_ERROR, 'ERROR');
    }
  },

  isReferrerValid: async (req, res, next) => {
    const { referrer: username } = req.body;

    try {
      if (username) {
        const referrer = await User.exists({ username, status: 'active' });

        if (!referrer) {
          return Response.send(res, NOT_FOUND, undefined, INVALID_REFERRER, 'ERROR');
        }
      }

      return next();
    } catch (err) {
      Logger.error(err.message);

      return Response.send(res, INTERNAL_SERVER_ERROR, undefined, SERVER_ERROR, 'ERROR');
    }
  },

  /**
   * Validates the user
   * @param {Object} req
   * @param {Object} res
   * @param {*} next
   * @returns {Object} pass on the request body or an error
   */
  getUsernameFromDomain: async (req, res, next) => {
    const { username, domain } = req.body;

    try {
      if (!username && domain) {
        const result = await Domain.findOne({ FQDN: `https://${domain}` }, { username: 1 });
        req.body.username = result.username;
      }

      return next();
    } catch (err) {
      Logger.error(err.message);
      return Response.send(res, INTERNAL_SERVER_ERROR, undefined, SERVER_ERROR, 'ERROR');
    }
  },

  /**
   * Check if a request relating to booking is for a user with booking integration
   * @param {Object} req
   * @param {Object} res
   * @param {*} next
   * @returns {Object} pass on the request body or an error
   */
  getUserBookingIntegration: async (req, res, next) => {
    const username = req.query?.username || req.body?.username || req.body?.user?.username;
    try {
      const bookingIntegrationExist = await BookingIntegration.findOne({
        username,
      });
      if (!bookingIntegrationExist) {
        return Response.send(
          res,
          NOT_FOUND,
          undefined,
          NO_BOOKING_INTEGRATION_FOUND,
          'ERROR'
        );
      }

      req.body.bookingAPI = {
        apiKey: bookingIntegrationExist.accessToken,
        uri: bookingIntegrationExist.uri,
      };

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
