import Joi from "@hapi/joi";

export default Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: true },
    })
    .required(),

  code: Joi.string().length(6).required(),

  password: Joi.string().required(),

  confirmPassword: Joi.ref("password"),
});
