import Joi from '@hapi/joi';

export default Joi.object({
  productId: Joi.string()
    .alphanum()
    .required()
});
