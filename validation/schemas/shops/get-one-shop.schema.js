import Joi from '@hapi/joi';

export default Joi.object({
  username: Joi.string(),

  domain: Joi.when('username', {
    is: Joi.exist(),
    then: Joi.forbidden(),
    otherwise: Joi.string().required(),
  }),

  title: Joi.string().required(),
});
