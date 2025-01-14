import Joi from '@hapi/joi';

export default Joi.object({
  username: Joi.string(),

  domain: Joi.when('username', {
    is: Joi.exist(),
    then: Joi.forbidden(),
    otherwise: Joi.string().required(),
  }),

  titles: Joi.array().items(Joi.string().required()).required(),

  withInventory: Joi.bool(),
});
