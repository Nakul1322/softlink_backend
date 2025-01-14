import Joi from '@hapi/joi';

export default Joi.object({
  username: Joi.string()
    .required(),

  name: Joi.string(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: {
        allow: true
      }
    }),

  phoneNumber: Joi.string(),
});
