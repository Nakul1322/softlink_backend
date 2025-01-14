import Joi from '@hapi/joi';

export default Joi.object({
  categoryName: Joi.string()
    .required(),

  childTag: Joi.string()
    .required(),

  user: Joi.object()
});
