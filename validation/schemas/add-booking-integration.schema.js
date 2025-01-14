import Joi from '@hapi/joi';

export default Joi.object({
  name: Joi.string()
    .valid('calendly'),
  
  accessToken: Joi.string()
    .required(),

  user: Joi.object()
});
