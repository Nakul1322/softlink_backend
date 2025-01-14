import Joi from '@hapi/joi';

export default Joi.object({
  domainId: Joi.string()
    .alphanum()
    .required(),

  pageId: Joi.string()
    .alphanum()
    .required()
});
