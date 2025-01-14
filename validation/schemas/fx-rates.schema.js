import Joi from '@hapi/joi';

export default Joi.object({
  from: Joi.string()
    .min(3)
    .max(3)
    .required(),

  to: Joi.string()
    .min(3)
    .max(3)
    .required(),

  amount: Joi.number()
    .min(1)
    .required(),
});
