import Joi from '@hapi/joi';

export default Joi.object({
  currency: Joi.string().valid('USD').required(),

  productName: Joi.string().required(),

  productImages: Joi.array().items(Joi.string().required()),

  amount: Joi.number().min(1).required(),

  quantity: Joi.when('adjustableQuantity.minimum', {
    is: Joi.exists,
    then: Joi.number()
      .integer()
      .greater(Joi.ref('adjustableQuantity.minimum'))
      .required(),
    otherwise: Joi.number().min(1).integer().required(),
  }),

  redirectUrls: Joi.object({
    success: Joi.string().uri().required(),
    cancel: Joi.string().uri().required(),
  }).required(),

  adjustableQuantity: Joi.object({
    minimum: Joi.number().integer().min(1).required(),
    maximum: Joi.number().integer().greater(Joi.ref('minimum')).required(),
  }),

  adjustable_quantity: {
    enabled: true,
    minimum: 1,
    maximum: 10,
  },
});
