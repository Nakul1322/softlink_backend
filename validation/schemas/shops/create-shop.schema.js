import Joi from '@hapi/joi';
import { SHOP } from '../../../helpers/constants';

export default Joi.object({
  name: Joi.string()
    .required(),

  title: Joi.string()
    .required(),

  description: Joi.string()
    .required(),

  pickupAddress: Joi.string(),

  selectedCustomDomain: Joi.string(),

  imageUrl: Joi.string()
    .required(),

  theme: Joi.string(),

  delivery: Joi.array()
    .items(Joi.object({
      location: Joi.string().required(),
      price: Joi.number().required(),
      currency: Joi.string().valid(...SHOP.currencyList).required(),
    }).required()),

  // currency: Joi.array()
  //   .items(Joi.string()).required(),

});
