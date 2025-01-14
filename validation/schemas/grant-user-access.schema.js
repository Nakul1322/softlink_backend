import Joi from '@hapi/joi';

export default Joi.object({
  username: Joi.string()
    .required(),

  subscriptionPackage: Joi.string()
    .valid('basic', 'basicPro', 'business', 'businessPro', 'enterprise', 'enterprisePro')
    .required(),

  plan: Joi.string()
    .valid('monthly', 'yearly')
    .required()
});
