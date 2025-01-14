import Joi from '@hapi/joi';

export default Joi.object({
  pageData: Joi.string()
    .required(),

  user: Joi.object()
});
