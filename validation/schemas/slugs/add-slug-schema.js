import Joi from '@hapi/joi';

export default Joi.object({
  type: Joi.string()
    .valid('shop', 'product')
    .required(),

  slug: Joi.string()
    .alphanum()
    .required(),

  shopId: Joi.when('type', {
    is: 'shop',
    then: Joi.string().alphanum().required()
  }),

  productId: Joi.when('type', {
    is: 'product',
    then: Joi.string().alphanum().required()
  })
});
