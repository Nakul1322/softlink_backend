import Joi from '@hapi/joi';

export default Joi.object({
  subscribed: Joi.boolean()
    .required(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: {
        allow: true
      }
    })
    .required(),

  username: Joi.string()
    .required(),
});
