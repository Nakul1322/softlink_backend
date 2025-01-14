import Joi from '@hapi/joi';

export default Joi.object({
  affiliateBalance: Joi.number()
    .required(),
});
