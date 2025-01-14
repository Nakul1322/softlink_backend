import Joi from '@hapi/joi';
import { GUARDS } from '../../../helpers/constants';

const {
  PLANS,
  SUBSCRIPTION_PACKAGES,
  PAYMENT_GATEWAYS,
  SUBSCRIPTION_CURRENCIES,
  SUBSCRIPTION_ACTIONS,
} = GUARDS;

export default Joi.object({
  plan: Joi.string()
    .valid(...PLANS)
    .required(),

  subscriptionPackage: Joi.string()
    .valid(...SUBSCRIPTION_PACKAGES)
    .invalid('free')
    .required(),

  transaction_id: Joi.string().required(),

  gateway: Joi.string()
    .valid(...PAYMENT_GATEWAYS)
    .required(),

  currency: Joi.string()
    .valid(...SUBSCRIPTION_CURRENCIES)
    .required(),

  action: Joi.string()
    .valid(...Object.keys(SUBSCRIPTION_ACTIONS))
    .required(),

  discountApplied: Joi.when('action', {
    not: SUBSCRIPTION_ACTIONS.subscribe,
    then: Joi.forbidden(),
    otherwise: Joi.boolean(),
  }),

  token: Joi.when('action', {
    not: SUBSCRIPTION_ACTIONS.subscribe,
    then: Joi.string().required(),
    otherwise: Joi.forbidden(),
  }),
});
