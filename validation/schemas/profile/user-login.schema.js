import Joi from "@hapi/joi";

export default Joi.object({
  username: Joi.string()
    .min(3)
    .max(30)
    .pattern(new RegExp("^(?=[a-zA-Z0-9]{3,20}$)(?!.*[_.]{2})[^_.].*[^_.]$"))
    .required(),

  password: Joi.string().required(),
});
