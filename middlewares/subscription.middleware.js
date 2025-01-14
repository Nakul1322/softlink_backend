import StatusCodes from "http-status-codes";
import Response from "../helpers/responseHelper";
import { GUARDS, MESSAGE, SUBSCRIPTION_STATUS } from "../helpers/constants";
import Logger from "../logs/winston";
import Models from "../models";

const {
  SERVER_ERROR,
  DUPLICATE_RESOURCE_FOUND,
  ACTIVE_SUBSCRIPTION_REQUIRED,
  BAD_UPGRADE_DOWNGRADE,
  STUCK_ON_SAME_PLAN,
  RESOURCE_NOT_FOUND,
} = MESSAGE;

const { CONFLICT, INTERNAL_SERVER_ERROR, FORBIDDEN, BAD_REQUEST } = StatusCodes;

const { Subscription } = Models;

export default {
  /**
   * Prevent duplicates subscription
   * @param {Object} req
   * @param {Object} res
   * @param {*} next
   * @returns {Object} pass on the request body or an error
   */
  preventDuplicates: async (req, res, next) => {
    const {
      user: { username },
      action,
    } = req.body;

    try {
      console.log('REACHED PREVENT DUPLICATES--->');
      const isSubscribed = await Subscription.exists({
        username,
        status: SUBSCRIPTION_STATUS.active,
      });
      
      console.log('THIS WILL THROW A CONFLICT----->', (action === GUARDS.SUBSCRIPTION_ACTIONS.subscribe && isSubscribed));
      // only validate new subscriptions
      return action === GUARDS.SUBSCRIPTION_ACTIONS.subscribe && isSubscribed
        ? Response.send(
            res,
            CONFLICT,
            undefined,
            DUPLICATE_RESOURCE_FOUND.replace("%resource%", "subscription"),
            "ERROR"
          )
        : next();
    } catch (err) {
      Logger.error(err.message);

      return Response.send(
        res,
        INTERNAL_SERVER_ERROR,
        undefined,
        SERVER_ERROR,
        "ERROR"
      );
    }
  },

  /**
   * Validate active subscription
   * @param {Object} req
   * @param {Object} res
   * @param {*} next
   * @returns {Object} pass on the request body or an error
   */
  validateActiveSubscription: async (req, res, next) => {
    const { username, isSubscribed, subscriptionPackage } = req.body.user;

    try {
      if (!isSubscribed || subscriptionPackage === SUBSCRIPTION_STATUS.free) {
        return Response.send(
          res,
          FORBIDDEN,
          undefined,
          ACTIVE_SUBSCRIPTION_REQUIRED,
          "ERROR"
        );
      }

      req.body.flag = 1;
      const addToSubscription = await Subscription.findOne(
        { username },
        { currency: 1 }
      )
        .sort({ id: -1 })
        .lean();
      
      if(addToSubscription == null) {
        req.body.flag = 0;
      }
      
      // //comment for original
      // if(addToSubscription == null) {
      //   return Response.send(
      //     res,
      //     FORBIDDEN,
      //     undefined,
      //     ACTIVE_SUBSCRIPTION_REQUIRED,
      //     "ERROR"
      //   );
      // }

      req.body.subscription = addToSubscription;
      return next();
    } catch (err) {
      Logger.error(err.message);

      return Response.send(
        res,
        INTERNAL_SERVER_ERROR,
        undefined,
        SERVER_ERROR,
        "ERROR"
      );
    }
  },

  confirmUpgradeOrDowngrade: async (req, res, next) => {
    const {
      action,
      plan: newPlan,
      subscriptionPackage: newPackage,
      user: { plan: oldPlan, subscriptionPackage: oldPackage },
    } = req.body;

    const { upgrade, downgrade } = GUARDS.SUBSCRIPTION_ACTIONS;

    const oldPackageIndex = GUARDS.SUBSCRIPTION_PACKAGES.indexOf(oldPackage);

    const newPackageIndex = GUARDS.SUBSCRIPTION_PACKAGES.indexOf(newPackage);

    try {
      // fail early, same plan, same package
      if (
        [upgrade, downgrade].includes(action) &&
        newPackageIndex === oldPackageIndex &&
        oldPlan === newPlan
      ) {
        return Response.send(
          res,
          BAD_REQUEST,
          undefined,
          STUCK_ON_SAME_PLAN.replace("%ACTION%", action),
          "ERROR"
        );
      }

      // invalid upgrade
      if (action === upgrade && newPackageIndex < oldPackageIndex) {
        return Response.send(
          res,
          BAD_REQUEST,
          undefined,
          BAD_UPGRADE_DOWNGRADE.replace("%ACTION%", upgrade).replace(
            "%TYPE%",
            "lower"
          ),
          "ERROR"
        );
      }

      // invalid downgrade
      if (action === downgrade && newPackageIndex > oldPackageIndex) {
        return Response.send(
          res,
          BAD_REQUEST,
          undefined,
          BAD_UPGRADE_DOWNGRADE.replace("%ACTION%", downgrade).replace(
            "%TYPE%",
            "higher"
          ),
          "ERROR"
        );
      }

      return next();
    } catch (err) {
      Logger.error(err.message);

      return Response.send(
        res,
        INTERNAL_SERVER_ERROR,
        undefined,
        SERVER_ERROR,
        "ERROR"
      );
    }
  },

  /**
   * Validate active subscription
   * @param {Object} req
   * @param {Object} res
   * @param {*} next
   * @returns {Object} pass on the request body or an error
   */
  validateSubscriptionId: async (req, res, next) => {
    const {
      subscriptionId,
      user: { username },
    } = req.body;

    try {
      req.body.subscription = await Subscription.findOne(
        { username, _id: subscriptionId },
        { currency: 1, status: 1 }
      )
        .sort({ id: -1 })
        .lean();

      if (!req.body.subscription) {
        return Response.send(
          res,
          NOT_FOUND,
          undefined,
          RESOURCE_NOT_FOUND,
          "ERROR"
        );
      }

      if (req.body.subscription.status === SUBSCRIPTION_STATUS.expired) {
        return Response.send(
          res,
          FORBIDDEN,
          undefined,
          ACTIVE_SUBSCRIPTION_REQUIRED,
          "ERROR"
        );
      }

      return next();
    } catch (err) {
      Logger.error(err.message);

      return Response.send(
        res,
        INTERNAL_SERVER_ERROR,
        undefined,
        SERVER_ERROR,
        "ERROR"
      );
    }
  },
};
