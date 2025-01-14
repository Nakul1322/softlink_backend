import Joi from "@hapi/joi";
import { GUARDS } from "../../../helpers/constants";

export default Joi.object({
  name: Joi.string(),

  username: Joi.string(),

  domain: Joi.when("username", {
    is: Joi.exist(),
    then: Joi.forbidden(),
    otherwise: Joi.string().required(),
  }),

  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: {
      allow: true,
    },
  }),

  phoneNumber: Joi.string(),

  location: Joi.object({
    ipAddress: Joi.string(),
    proxy: Joi.boolean(),
    city: Joi.string(),
    state: Joi.string(),
    country: Joi.string(),
  }),

  fields: Joi.object(),

  metadata: Joi.object(),

  payment: Joi.object(),

  _id: Joi.string(),

  pageId: Joi.string(),

  tag: Joi.string(),

  lists: Joi.array(),

  tags: Joi.array(),

  emailTemplateId: Joi.object(),

  pageUrl: Joi.string().required(),

  gateway: Joi.string()
    .valid(...GUARDS.PAYMENT_GATEWAYS)

});
