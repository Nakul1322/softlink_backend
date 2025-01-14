import Joi from "@hapi/joi";

export default Joi.object({
  username: Joi.string()
    .min(3)
    .max(30)
    .pattern(new RegExp("^(?=[a-zA-Z0-9]{3,20}$)(?!.*[_.]{2})[^_.].*[^_.]$")),

  phoneNumber: Joi.when("username", {
    not: Joi.exist(),
    then: Joi.when("email", {
      not: Joi.exist(),
      then: Joi.string().required(),
      otherwise: Joi.forbidden(),
    }),
    otherwise: Joi.forbidden(),
  }),

  email: Joi.when("username", {
    not: Joi.exist(),
    then: Joi.when("phoneNumber", {
      not: Joi.exist(),
      then: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: true },
        })
        .required(),
      otherwise: Joi.forbidden(),
    }),
    otherwise: Joi.forbidden(),
  }),
});
