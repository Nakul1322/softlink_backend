import Joi from '@hapi/joi';

export default Joi.object({
  name: Joi.string()
    .required(),

  description: Joi.string(),

  user: Joi.object()
});
