import Joi from '@hapi/joi';
import { GUARDS } from '../../../helpers/constants';

export default Joi.object({
  username: Joi.string(),

  domain: Joi.when('username', {
    is: Joi.exist(),
    then: Joi.string().optional(),
    otherwise: Joi.string().required(),
  }),

  products: Joi.array().items(
    Joi.object({
      id: Joi.string().required(),
      quantity: Joi.number().integer().required().min(1),
      addedVariants: Joi.object(),
      pricePointId: Joi.string(),
      name: Joi.string(),
      price: Joi.string(),
      subTotal: Joi.number().required(),
      currency: Joi.string(),
      preOrder: Joi.object({
        status: Joi.boolean().required(),
        date: Joi.when('status', {
          is: true,
          then: Joi.date().required(),
        }),
      }).required(),
      upSell: Joi.object({
        pricePointId: Joi.string(),
        product: Joi.object(),
        price: Joi.object(),
        headline: Joi.string(),
        description: Joi.string(),
        preview: Joi.string(),
        thumbnail: Joi.boolean(),
        bouncingArrow: Joi.boolean(),
      }),
    }).required()
  ),

  subTotal: Joi.number().required(),

  total: Joi.number().required(),

  deliveryFee: Joi.number().required(),

  quantity: Joi.number().integer().min(1).required(),

  shopId: Joi.string(),

  customer: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phoneNumber: Joi.number().required(),
    address: Joi.string(),
    notes: Joi.string(),
    delivery: Joi.string(),
  }).required(),

  transaction_id: Joi.string().required(),

  gateway: Joi.string()
    .valid(...GUARDS.PAYMENT_GATEWAYS)
    .required(),

  aff: Joi.string(),

  url: Joi.string(),

  envUrl: Joi.string(),
});
