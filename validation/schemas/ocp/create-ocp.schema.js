/* eslint-disable no-tabs */
import Joi from '@hapi/joi';
import {
  SHOP, OCP_PRICE_POINTS, OCP_CONTENT_PAGE, OCP_RECURRING_ORDER_OPTIONS, GATEWAYS
} from '../../../helpers/constants';

const { currencyList } = SHOP;
const { pricePointTypes } = OCP_PRICE_POINTS;
const { options } = OCP_RECURRING_ORDER_OPTIONS;
const { pages } = OCP_CONTENT_PAGE;
const { gateways } = GATEWAYS;

export default Joi.object({
  ocpId: Joi.string(),

  title: Joi.string(),
  imageUrl: Joi.string(),
  internalName: Joi.string(),
  officialName: Joi.string(),
  description: Joi.string(),
  productTheme: Joi.string(),
  isCompleted: Joi.boolean(),

  // Pricing and Price Points
  pricePoints: Joi.array().items(
    Joi.object({
      id: Joi.string(),
      title: Joi.string(),
      pricePointType: Joi.object({
        typeOption: Joi.string().valid(...pricePointTypes),
        reoccurence: Joi.when('typeOption', {
          is: OCP_PRICE_POINTS.INSTALLMENTS || OCP_PRICE_POINTS.RECURRING,
          then: Joi.string().valid(...options).required(),
        }),
        installments: Joi.when('typeOption', {
          is: OCP_PRICE_POINTS.INSTALLMENTS,
          then: Joi.number().required(),
        }),
      }),
      description: Joi.string(),
      gateway: Joi.array().items(
        Joi.object({
          id: Joi.string(),
          name: Joi.string().valid(...gateways),
          publicKey: Joi.string(),
          initialPayment: Joi.array().items(
            Joi.object({
              id: Joi.string(),
              amount: Joi.number(),
              currency: Joi.string().valid(...currencyList),
              isActive: Joi.boolean(),
            }),
          ),
          price: Joi.array().items(
            Joi.object({
              id: Joi.string(),
              amount: Joi.number(),
              currency: Joi.string().valid(...currencyList),
              isActive: Joi.boolean(),
            }),
          ),
          isActive: Joi.boolean(),
        }),
      ),
      retry: Joi.number(),
      initialPayment: Joi.boolean(),
      isDefaultPrice: Joi.boolean(),
    }),
  ),

  // Shipping cost
  shippingCost: Joi.array().items(
    Joi.object({
      address: Joi.string(),
      amount: Joi.number(),
      currency: Joi.string().valid(...currencyList),
    })
  ),

  // Sales Tax
  salesTax: Joi.boolean(),

  // Refund Policy
  refundPolicy: Joi.string(),

  // Thank you page for price points - saved to price point model using price point id
  thankyouPages: Joi.array().items(
    Joi.object({
      pricePointId: Joi.string(),
      destinationPage: Joi.string(),
      isExternalUrl: Joi.boolean(),
    }),
  ),

  // order success and cart abandonment email IDs
  emails: Joi.array().items(
    Joi.object({
      pricePointId: Joi.string(),
      orderSuccessfulEmailID: Joi.string(),
      cartAbandonmentEmailID: Joi.string(),
    }),
  ),

  // Checkout form fields
  checkoutForm: Joi.string(),

  // product quantity
  quantity: Joi.number(),

  // cart abandonment - saved to price point model using price point id - ask daniel about the data to save for this
  cartAbandonment: Joi.array().items(
    Joi.object({
      pricePointId: Joi.string(),
      tag: Joi.array().items(Joi.string()),
    }),
  ),

  // terms and condition
  termsCondition: Joi.object({
    terms: Joi.string().required(),
    text: Joi.string()
  }),

  // affiliate
  affiliate: Joi.object({
    enabled: Joi.boolean().required(),
    commission: Joi.string()
  }),

  salesPage: Joi.object({
    isExternalUrl: Joi.boolean().required(),
    pageTitle: Joi.string(),
    externalUrl: Joi.string()
  }),

  // Customer mailing list - price point
  mailingList: Joi.array().items(
    Joi.object({
      pricePointId: Joi.string(),
      list: Joi.array().items(Joi.string()),
    }),
  ),

  // customer tags
  customerTags: Joi.array().items(
    Joi.object({
      pricePointId: Joi.string(),
      tag: Joi.array().items(Joi.string()),
    }),
  ),

  // product content access (membership, usage-count, downloadable-file)
  contentPage: Joi.object({
    page: Joi.string().valid(...pages),
    pricePoints: Joi.array().items(
      Joi.object({
        pricePointId: Joi.string(),
        membership: Joi.object({
          id: Joi.string(),
          accessId: Joi.string(),
          expireAt: Joi.string(),
          expireIn: Joi.number(),
        }),
        usageCount: Joi.object({
          id: Joi.string(),
          countNumber: Joi.number(),
          timePeriod: Joi.number(),
        }),
        downloadableFile: Joi.string(),
      }),
    ),
  }),

  // product content access (membership, usage-count, downloadable-file)
  upSell: Joi.object({
    enabled: Joi.boolean(),
    pricePoints: Joi.array().items(
      Joi.object({
        pricePointId: Joi.string(),
        product: Joi.string(),
        price: Joi.string(),
        headline: Joi.string(),
        upSellDescription: Joi.string(),
        preview: Joi.string(),
        thumbnail: Joi.boolean(),
        bouncingArrow: Joi.boolean(),
      }),
    ),
  }),
});
