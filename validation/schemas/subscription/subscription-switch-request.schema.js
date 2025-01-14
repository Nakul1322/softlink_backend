import Joi from '@hapi/joi';

export default Joi.object({
  switchType: Joi.string()
    .valid('upgrade', 'downgrade')
    .required(),

  subscriptionPackage: Joi.string()
    .valid('free', 'basic', 'basicPro', 'business', 'businessPro', 'enterprise', 'enterprisePro')
    .required(),

  plan: Joi.string()
    .valid('monthly', 'yearly')
    .required(),

  user: Joi.object()
});
