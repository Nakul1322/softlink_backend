import Joi from '@hapi/joi';

export default Joi.object({
  affiliation: Joi.object({
    affiliate: Joi.string().required(),
    productType: Joi.string(),
    product: Joi.string(),
    ocp: Joi.string(),
    shop: Joi.string(),
    url: Joi.string()
  }).required(),

  affiliateEmail: Joi.string().required(),
  commission: Joi.number().required(),
  envUrl: Joi.string().required(),
});
