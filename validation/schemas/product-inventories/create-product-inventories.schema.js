import Joi from '@hapi/joi';

export default Joi.object({
  username: Joi.string(),

  productId: Joi.string().required(),

  variables: Joi.array().items(Joi.object()).required(),

  variants: Joi.array().items(Joi.object()),

  fields: Joi.object()

});
