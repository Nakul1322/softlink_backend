import Joi from '@hapi/joi';

export default Joi.object({
  name: Joi.string()
    .valid('flutterwave', 'paystack', 'paypal', 'stripe'),

  publicKey: Joi.string()
    .required(),

  secretKey: Joi.string()
    .required(),

  encryptionKey: Joi.string(),

  user: Joi.object()
});
