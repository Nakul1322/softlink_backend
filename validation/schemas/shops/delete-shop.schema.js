import Joi from '@hapi/joi';

export default Joi.object({
  shopId: Joi.string()
    .alphanum()
    .required()
});
