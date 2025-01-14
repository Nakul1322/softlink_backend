/* eslint-disable eqeqeq */
import StatusCodes from 'http-status-codes';
import { MESSAGE, GUARDS } from '../helpers/constants';
import Logger from '../logs/winston';
import Response from '../helpers/responseHelper';
import Models from '../models';
import { getDataFromRedis } from '../helpers/utils';

const {
  Page, Domain, Lead, User, Product, Shop, Membership,
} = Models;

const {
  ACTIVE_SUBSCRIPTION_REQUIRED,
  SUBSCRIPTION_PACKAGE_NOT_SUPPORTED,
  MAXED_OUT_RESOURCE,
  INSUFFICIENT_SPACE,
  SERVER_ERROR,
  MAXIMUM_RESOURCE_REACHED_FOR_PLAN,
  DUPLICATE_RESOURCE_FOUND,
  CANNOT_CREATE_MEMBERSHIP,
  MEMBERSHIP_LIMIT,
  CANNOT_CREATE_USAGE_COUNT,
} = MESSAGE;

const {
  CONFLICT,
  FORBIDDEN,
  INTERNAL_SERVER_ERROR,
  PAYMENT_REQUIRED,
  INSUFFICIENT_STORAGE,
} = StatusCodes;

const {
  PAGES_LIMIT,
  DOMAINS_LIMITS,
  LEADS_LIMIT,
  EMAIL_MARKETING_LIMIT,
  SUBSCRIPTION_PACKAGES,
  PLANS,
  PRODUCTS_LIMIT,
  SHOPS_LIMIT,
} = GUARDS;

export default {
  /**
   * Allows users to only create pages specified in their plans
   * @param {Object} req - data pass from the token
   * @param {Object} res - response passed back
   * @param {*} next
   * @returns {Object} pass on the request body or an error
   */
  pagesLimitGuard: async (req, res, next) => {
    const {
      pageTitle,
      // user: { username, subscriptionPackage },
    } = req.body;

    const username = req.body.hasOwnProperty('user') ? req.body.user.username : await getDataFromRedis(`${req.headers.authorization.split(' ')[1].substr(-20)}_universalUsername`);
    const subscriptionPackage = req.body.hasOwnProperty('user') ? req.body.user.subscriptionPackage : await getDataFromRedis(`${req.headers.authorization.split(' ')[1].substr(-20)}_universalSubscriptionPackage`); 

    try {
      const pagesCount = await Page.countDocuments({ username });
      
      // keep free users to limit set, no overage applicable
      if (subscriptionPackage === 'free' && pagesCount >= PAGES_LIMIT.free) {
        return Response.send(
          res,
          FORBIDDEN,
          undefined,
          MAXIMUM_RESOURCE_REACHED_FOR_PLAN.replace('%resource%', 'pages'),
          'ERROR'
        );
      }

      // prevent duplicates
      const isPageExisting = await Page.findOne({ username, pageTitle });

      if (isPageExisting) {
        return Response.send(
          res,
          CONFLICT,
          undefined,
          DUPLICATE_RESOURCE_FOUND.replace('%resource%', 'page'),
          'ERROR'
        );
      }

      // check for limits/restrictions
      const pageLimit = PAGES_LIMIT[subscriptionPackage];

      if (pageLimit && pagesCount >= pageLimit) {
        req.body.user.limitedExceeded = true;
      }

      return next();
    } catch (err) {
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
   * Allows users to only create domains specified in their plans
   * @param {Object} req
   * @param {Object} res
   * @param {*} next
   * @returns {Object} pass on the request body or an error
   */
  domainsLimitGuard: async (req, res, next) => {
    const { username, subscriptionPackage } = req.body.user;

    try {
      // check for limits/restrictions...
      const domainLimit = DOMAINS_LIMITS[subscriptionPackage];

      // ...and block specific packages
      if (domainLimit === 0) {
        return Response.send(
          res,
          FORBIDDEN,
          undefined,
          SUBSCRIPTION_PACKAGE_NOT_SUPPORTED,
          'ERROR'
        );
      }

      const domainsCount = await Domain.countDocuments({ username });

      const limitedExceeded = domainsCount >= domainLimit;

      // overages not applicable for basic pro
      if (limitedExceeded && subscriptionPackage === 'basicPro') {
        return Response.send(
          res,
          FORBIDDEN,
          undefined,
          MAXIMUM_RESOURCE_REACHED_FOR_PLAN.replace('%resource%', 'domains'),
          'ERROR'
        );
      }

      // will add overage charges, if applicable, if over the limit
      req.body.user.limitedExceeded = limitedExceeded;

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

  /**
   * Force users to only accept leads specified in their plans
   * @param {Object} req
   * @param {Object} res
   * @param {*} next
   * @returns {Object} pass on the request body or an error
   */
  leadsLimitGuard: async (req, res, next) => {
    const { username, stage } = req.body;

    try {
      // get user's subscription package
      const { subscriptionPackage } = await User.findOne(
        { username },
        { subscriptionPackage: 1 }
      );

      const leadsCount = await Lead.countDocuments({ username });

      const leadsLimit = LEADS_LIMIT[subscriptionPackage];

      const limitedExceeded = leadsCount >= leadsLimit;

      // only check during 'create' NOT 'update'
      if (stage === 'create' && limitedExceeded) {
        // 1. free users === no overages applicable
        if (subscriptionPackage === 'free') {
          return Response.send(
            res,
            PAYMENT_REQUIRED,
            undefined,
            MAXED_OUT_RESOURCE.replace('%resource%', 'leads'),
            'ERROR'
          );
        }

        // 2. other users === overages
        req.body.limitedExceeded = true;
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

  /**
   * Prevents crossing the total number of leads during upload
   * @param {Object} req - data pass from the token
   * @param {Object} res - response passed back
   * @param {*} next
   * @returns {Object} pass on the request body or an error
   */
  uploadLeadsGuard: async (req, res, next) => {
    const {
      username,
      leads,
      user: { subscriptionPackage },
    } = req.body;

    try {
      const leadsCount = await Lead.countDocuments({ username });

      const leadsLimit = LEADS_LIMIT[subscriptionPackage];

      const limitedWillBeExceeded = leadsLimit - leadsCount < leads.length;

      return limitedWillBeExceeded
        ? Response.send(
          res,
          INSUFFICIENT_STORAGE,
          undefined,
          INSUFFICIENT_SPACE,
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

  /**
   * Locks subscription-based routes from non-subscribed users
   * @param {Object} req - data pass from the token
   * @param {Object} res - response passed back
   * @param {*} next
   * @returns {Object} pass on the request body or an error
   */
  subscriptionAccessGuard: async (req, res, next) => {
    const { isSubscribed, subscriptionPackage, plan } = req.body.user;

    return !isSubscribed
      || !SUBSCRIPTION_PACKAGES.includes(subscriptionPackage)
      || !PLANS.includes(plan)
      ? Response.send(
        res,
        PAYMENT_REQUIRED,
        undefined,
        ACTIVE_SUBSCRIPTION_REQUIRED,
        'ERROR'
      )
      : next();
  },

  /**
   * Check User Pricing for Membership Creation
   * @param {Object} req - data pass from the token
   * @param {Object} res - response passed back
   * @param {*} next
   * @returns {Object} pass on the request body or an error
   */
  createMembershipGuard: async (req, res, next) => {
    const {
      isSubscribed, subscriptionPackage, plan, username
    } = req.body.user;

    const membership = await Membership.find({ username });

    if (!isSubscribed || !SUBSCRIPTION_PACKAGES.includes(subscriptionPackage) || !PLANS.includes(plan)) return Response.send(res, PAYMENT_REQUIRED, undefined, ACTIVE_SUBSCRIPTION_REQUIRED, 'ERROR');

    if (subscriptionPackage == 'pro') return Response.send(res, FORBIDDEN, undefined, CANNOT_CREATE_MEMBERSHIP, 'ERROR');

    if (subscriptionPackage == 'business' && membership && membership.length >= 3) return Response.send(res, FORBIDDEN, undefined, MEMBERSHIP_LIMIT, 'ERROR');

    if (subscriptionPackage == 'enterprise' && membership && membership.length >= 5) return Response.send(res, FORBIDDEN, undefined, MEMBERSHIP_LIMIT, 'ERROR');

    next();
  },

  /**
   * Check User Pricing for Usagge Count Creation
   * @param {Object} req - data pass from the token
   * @param {Object} res - response passed back
   * @param {*} next
   * @returns {Object} pass on the request body or an error
   */
  createOCPGuard: async (req, res, next) => {
    const { isSubscribed, subscriptionPackage, plan } = req.body.user;

    if (!isSubscribed || !SUBSCRIPTION_PACKAGES.includes(subscriptionPackage) || !PLANS.includes(plan)) return Response.send(res, PAYMENT_REQUIRED, undefined, ACTIVE_SUBSCRIPTION_REQUIRED, 'ERROR');

    if (subscriptionPackage == 'pro') return Response.send(res, FORBIDDEN, undefined, CANNOT_CREATE_USAGE_COUNT, 'ERROR');

    next();
  },

  /**
   * Only allow specific packages to broadcast emails
   * @param {Object} req - data pass from the token
   * @param {Object} res - response passed back
   * @param {*} next
   * @returns {Object} pass on the request body or an error
   */
  broadcastAccessGuard: async (req, res, next) => {
    try {
      const {
        standalone,
        user: { subscriptionPackage },
      } = req.body;

      return !standalone && !EMAIL_MARKETING_LIMIT[subscriptionPackage]
        ? Response.send(
          res,
          FORBIDDEN,
          undefined,
          SUBSCRIPTION_PACKAGE_NOT_SUPPORTED,
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

  /**
   * Allows users to only create products specified in their plans
   * @param {Object} req - data pass from the token
   * @param {Object} res - response passed back
   * @param {*} next
   * @returns {Object} pass on the request body or an error
   */
  productsLimitGuard: async (req, res, next) => {
    const { username, subscriptionPackage } = req.body.user;

    try {
      const productsCount = await Product.countDocuments({ username });

      const productLimit = PRODUCTS_LIMIT[subscriptionPackage];

      return productLimit && productsCount >= productLimit
        ? Response.send(
          res,
          FORBIDDEN,
          undefined,
          MAXIMUM_RESOURCE_REACHED_FOR_PLAN.replace('%resource%', 'products'),
          'ERROR'
        )
        : next();
    } catch (err) {
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
   * Allows users to only create shops specified in their plans
   * @param {Object} req - data pass from the token
   * @param {Object} res - response passed back
   * @param {*} next
   * @returns {Object} pass on the request body or an error
   */
  shopsLimitGuard: async (req, res, next) => {
    const { username, subscriptionPackage } = req.body.user;

    try {
      const shopsCount = await Shop.countDocuments({ username });

      const shopLimit = SHOPS_LIMIT[subscriptionPackage];

      return shopLimit && shopsCount >= shopLimit
        ? Response.send(
          res,
          FORBIDDEN,
          undefined,
          MAXIMUM_RESOURCE_REACHED_FOR_PLAN.replace('%resource%', 'shops'),
          'ERROR'
        )
        : next();
    } catch (err) {
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
