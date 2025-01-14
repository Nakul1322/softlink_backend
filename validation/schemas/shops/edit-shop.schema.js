import Joi from '@hapi/joi';
import { SHOP } from '../../../helpers/constants';

export default Joi.object({
  name: Joi.string(),

  title: Joi.string(),

  description: Joi.string(),

  pickupAddress: Joi.string(),

  imageUrl: Joi.string(),

  theme: Joi.string(),

  delivery: Joi.array()
    .items(Joi.object({
      location: Joi.string().required(),
      price: Joi.number().required(),
      currency: Joi.string().valid(...SHOP.currencyList).required(),
    }).required()),

  // currency: Joi.string()
  //   .valid(...SHOP.currencyList),

  facebookPixelId: Joi.string(),

  selectedCustomDomain: Joi.string(),
});
