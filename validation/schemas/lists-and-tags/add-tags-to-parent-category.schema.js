import Joi from '@hapi/joi';

export default Joi.object({
  categoryName: Joi.string()
    .required(),

  tagsArray: Joi.array()
    .items(Joi.string().required())
    .required(),

  expires: Joi.object(),

  user: Joi.object()
});
