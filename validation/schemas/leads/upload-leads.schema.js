import Joi from '@hapi/joi';

export default Joi.object({
  verificationCode: Joi.string().required(),

  username: Joi.string().required(),

  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: {
      allow: true
    }
  }).required(),

  leads: Joi.array().items(
    Joi.object()
  ).required(),

  user: Joi.object()
});
