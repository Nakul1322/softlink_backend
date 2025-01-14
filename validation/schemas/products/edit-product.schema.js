import Joi from '@hapi/joi';
import { SHOP } from '../../../helpers/constants';

export default Joi.object({
  name: Joi.string(),

  title: Joi.string(),

  description: Joi.string(),

  price: Joi.array().items(
    Joi.object({
      old: Joi.number(),
      new: Joi.number().required(),
      currency: Joi.string().valid(...SHOP.currencyList).required(),
    })
  ),

  isActive: Joi.boolean(),

  quantity: Joi.number(),

  category: Joi.string(),

  subcategory: Joi.when('category', {
    is: Joi.exist(),
    then: Joi.string().required(),
  }),

  section: Joi.string(),

  subsection: Joi.when('section', {
    is: Joi.exist(),
    then: Joi.string().required(),
  }),

  tags: Joi.when('productType', {
    is: 'digital',
    then: Joi.array().items(Joi.string().required()),
  }),

  list: Joi.when('productType', {
    is: 'digital',
    then: Joi.array().items(Joi.string().required()),
  }),

  preOrder: Joi.object({
    status: Joi.boolean().required(),
    date: Joi.when('status', {
      is: true,
      then: Joi.date().required(),
    }),
  }),

  affiliate: Joi.object({
    enabled: Joi.boolean(),
    commission: Joi.string()
  }),

  fileIds: Joi.array().items(Joi.string().required()),

  productTheme: Joi.string(),

  shopId: Joi.string(),

  images: Joi.array().items(Joi.string().required()),

  delivery: Joi.array().items(
    Joi.object({
      location: Joi.string().required(),
      price: Joi.number().required(),
      currency: Joi.string()
        .valid(...SHOP.currencyList)
        .required(),
    }).required()
  ),

  facebookPixelId: Joi.string(),

  selectedCustomDomain: Joi.string(),

  externalUrl: Joi.string()
});
