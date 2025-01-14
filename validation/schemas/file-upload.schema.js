import Joi from '@hapi/joi';

export default Joi.object({
  fileContent: Joi.object(),

  meta: Joi.string()
    .valid('pageSettings', 'fileVault', 'images')
    .required(),

  user: Joi.object()
});
