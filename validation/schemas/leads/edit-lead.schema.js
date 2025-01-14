import Joi from '@hapi/joi';
import { GUARDS } from '../../../helpers/constants';

export default Joi.object({
  name: Joi.string(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: {
        allow: true
      }
    }),

  phoneNumber: Joi.string(),

  location: Joi.object({
    ipAddress: Joi.string(),
    proxy: Joi.boolean(),
    city: Joi.string(),
    state: Joi.string(),
    country: Joi.string(),
  }),

  lists: Joi.array(),
  tags: Joi.array(),

  // allow token object pass
  user: Joi.object(),

  gateway: Joi.string()
  .valid(...GUARDS.PAYMENT_GATEWAYS)
  
});
