import Joi from '@hapi/joi';
import { SHOP } from '../../../helpers/constants';

const {
  productType,
  currencyList,
  // product: {
  //   categories,
  //   subCategories
  // }
} = SHOP;

export default Joi.object({
  name: Joi.string().required(),

  title: Joi.string().required(),

  description: Joi.string().required(),

  price: Joi.array().items(
    Joi.object({
      old: Joi.number(),
      new: Joi.number().required(),
      currency: Joi.string().valid(...currencyList).required()
    })
  ).required(),

  productType: Joi.string()
    .valid(...productType)
    .required(),

  delivery: Joi.when('productType', {
    is: 'physical',
    then: Joi.array().items(
      Joi.object({
        location: Joi.string().required(),
        price: Joi.number().required(),
        currency: Joi.string()
          .valid(...currencyList)
          .required(),
      }).required()
    ),
  }),

  quantity: Joi.number().min(-1).required(),

  // currency: Joi.number()
  //   .valid(...currencyList)
  //   .required(),

  images: Joi.array().items(Joi.string().required()).required(),

  externalUrl: Joi.string(),

  category: Joi.string().required(),

  subcategory: Joi.string().required(),

  section: Joi.string(),

  subsection: Joi.when('section', {
    is: Joi.exist(),
    then: Joi.string().required(),
  }),

  productTheme: Joi.string(),

  shopId: Joi.string().required(),

  tags: Joi.when('productType', {
    is: 'digital',
    then: Joi.array().items(Joi.string().required()),
  }),

  list: Joi.when('productType', {
    is: 'digital',
    then: Joi.array().items(Joi.string().required()),
  }),

  variables: Joi.object(),

  preOrder: Joi.object({
    status: Joi.boolean().required(),
    date: Joi.when('status', {
      is: true,
      then: Joi.date().required(),
    }),
  }).required(),

  affiliate: Joi.object({
    enabled: Joi.boolean(),
    commission: Joi.string()
  }),

  fileIds: Joi.when('productType', {
    not: 'digital',
    then: Joi.forbidden(),
    otherwise: Joi.array().items(Joi.string()), // .required()
  }),

  membership: Joi.object({
    id: Joi.string().allow(null, ''),
    accessId: Joi.string().allow(null, ''),
    expireAt: Joi.date().allow(null),
    expireIn: Joi.number().allow(null),
  }),

  facebookMarketSpace: Joi.boolean(),

  selectedCustomDomain: Joi.string(),
});
