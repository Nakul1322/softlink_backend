import Joi from '@hapi/joi';

export default Joi.object({
  usageCount: Joi.string().required(),

  email: Joi.string().required(),

});
