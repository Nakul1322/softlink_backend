import Joi from '@hapi/joi';

export default Joi.object({
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: {
      allow: true
    }
  }).required(),

  user: Joi.object()
});
