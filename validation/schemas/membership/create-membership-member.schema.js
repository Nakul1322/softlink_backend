import Joi from '@hapi/joi';

export default Joi.object({
  email: Joi.string().required(),

  membershipId: Joi.string().required(),

  membershipAccessId: Joi.string().required(),

  username: Joi.string(),

  expire: Joi.object({
    expireAt: Joi.number(),
    expireIn: Joi.number(),
  }).allow(null, Joi.object()),

});
