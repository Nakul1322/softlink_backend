import { Schema, model } from 'mongoose';

const pageSchema = new Schema({
  username: { type: String, lowercase: true },
  userId: { type: String },
  pageTitle: { type: String, lowercase: true },
  pageSettings: {
    backgroundColor: { type: String, default: 'ghostwhite' },
    backgroundGradient: String,
    backgroundImage: String,
    backgroundSize: String,
    backgroundImagePosition: String,
    backgroundImageFixed: Boolean,
    backgroundImageTint: String,
    backgroundType: String,
    fontFamily: String,
    fontSize: String,
    textColor: { type: String, default: 'black' },
    linkColor: { type: String, default: 'blue' },
    // extended
    useTheme: Boolean,
    backgroundGradientAngle: Number,
    themeType: String,
    googleAnalyticsCode: String,
    facebookPixelCode: String,
    faviconImg: String,
    metaTitle: String,
    metaDescription: String,
    metaImg: String,
    pageThumbnail: String,
    pageTheme: Object,
    metaFacebookDomain: String
  },
  // extend, yet again
  builderType: { type: String, default: 'simple' },
  category: Array,
  subCategory: Array,
  removeBranding: { type: Boolean, default: false },
  published: { type: Boolean, default: false },
  pageData: { type: JSON, default: null },
  isExpired: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  isSubPage: Boolean,
  updatedAt: { type: Date, default: Date.now },
  deletedAt: Date,
  // extended
  friendlyName: String,
  selectedCustomDomain: { type: String, default: 'none' },
  selectedCustomSubDomain: { type: String, default: 'none' },
}, { versionKey: false });

const PageModel = model('Page', pageSchema);

export default PageModel;
