import Joi from '@hapi/joi';

export default Joi.object({
  firstName: Joi.string().required(),

  lastName: Joi.string().required(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: true },
    })
    .required(),

  phoneNumber: Joi.string().required(),

  username: Joi.string()
    .min(3)
    .max(30)
    .pattern(new RegExp('^(?=[a-zA-Z0-9]{3,20}$)(?!.*[_.]{2})[^_.].*[^_.]$'))
    .required(),

  password: Joi.string().required(),

  referrer: Joi.string().pattern(
    new RegExp('^(?=[a-zA-Z0-9]{3,20}$)(?!.*[_.]{2})[^_.].*[^_.]$')
  ),
});
