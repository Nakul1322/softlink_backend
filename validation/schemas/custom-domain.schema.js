import Joi from '@hapi/joi';

export default Joi.object({
  domain: Joi.string()
    .pattern(new RegExp('^(\\d|\\w)+$'))
    .invalid('example')
    .required(),

  extension: Joi.string()
    .required(),

  user: Joi.object()
});
