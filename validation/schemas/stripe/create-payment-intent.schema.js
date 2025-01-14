import Joi from '@hapi/joi';

export default Joi.object({
  amount: Joi.number().integer().min(1).required(),

  currency: Joi.string().valid('USD', 'GBP', 'NGN').required(),// NGN ADDED

  customerId: Joi.string().required(),

  futureUsage: Joi.string().valid('on_session', 'off_session').required(),
});
