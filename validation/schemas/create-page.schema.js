import Joi from '@hapi/joi';

export default Joi.object({
  pageTitle: Joi.string()
    .required(),

  friendlyName: Joi.string()
    .required(),

  builderType: Joi.string()
    .valid('simple', 'advanced')
    .required(),

  user: Joi.object()
});
