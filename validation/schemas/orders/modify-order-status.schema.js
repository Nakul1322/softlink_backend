import Joi from '@hapi/joi';

export default Joi.object({
  orderId: Joi.string()
    .alphanum()
    .required(),

  status: Joi.string()
    .valid('confirmed', 'completed', 'cancelled')
    .required(),

  returnUpdated: Joi.string()
    .valid('yes', 'no', 'on', 'off')
});
