import Joi from '@hapi/joi';
import { FILTER_CATEGORIES } from '../../helpers/constants';

const { PAGES } = FILTER_CATEGORIES;

const pageCategories = Object.keys(PAGES);
const pageSubCategories = [];

for (const subsCategory in PAGES) {
  pageSubCategories.push(PAGES[subsCategory]);
}

export default Joi.object({
  pageTitle: Joi.string(),
  published: Joi.boolean(),
  friendlyName: Joi.string(),
  selectedCustomDomain: Joi.string(),
  selectedCustomSubDomain: Joi.string(),
  pageSettings: {
    backgroundColor: Joi.string(),
    backgroundGradient: Joi.string(),
    backgroundImage: Joi.string(),
    backgroundSize: Joi.string(),
    backgroundImagePosition: Joi.string(),
    backgroundImageFixed: Joi.boolean(),
    backgroundImageTint: Joi.string(),
    backgroundType: Joi.string(),
    fontFamily: Joi.string(),
    fontSize: Joi.string(),
    textColor: Joi.string(),
    linkColor: Joi.string(),
    // extended
    useTheme: Joi.boolean(),
    backgroundGradientAngle: Joi.number(),
    themeType: Joi.string(),
    googleAnalyticsCode: Joi.string(),
    facebookPixelCode: Joi.string(),
    faviconImg: Joi.string(),
    metaTitle: Joi.string(),
    metaDescription: Joi.string(),
    metaImg: Joi.string(),
    pageThumbnail: Joi.string(),
    metaFacebookDomain: Joi.string(),
    pageTheme: Joi.object(),
  },

  // extend yet again
  category: Joi.array()
    .items(Joi.string().valid(...pageCategories)),
  subCategory: Joi.array()
    .when('category',
      {
        is: Joi.exist(),
        then: Joi.required()
      })
    .items(Joi.string().valid(...pageSubCategories.flat())),

  returnUpdatedDocument: Joi.string()
    .valid('on', 'off')
    .required()
});
