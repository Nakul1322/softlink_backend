import Joi from '@hapi/joi';

export default Joi.object({
  currentSubscriptionPackage: Joi.string()
    .valid('basic', 'pro', 'business')
    .required(),

  newSubscriptionPackage: Joi.string()
    .valid('free', 'basic', 'basicPro', 'business', 'businessPro', 'enterprise', 'enterprisePro')
    .required(),
});
