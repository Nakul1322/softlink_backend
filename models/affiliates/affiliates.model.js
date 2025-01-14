import { Schema, model } from 'mongoose';

const affiliateSchema = new Schema(
  {
    affiliation: {
      affiliate: { type: String, default: 'product' },
      product: { type: Schema.Types.ObjectId, ref: 'Product' },
      ocp: { type: Schema.Types.ObjectId, ref: 'Ocp' },
      productType: { type: String },
      shop: { type: Schema.Types.ObjectId, ref: 'Shop' },
      url: { type: String },
      code: { type: String }
    },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    email: { type: String },
    merchantId: { type: Schema.Types.ObjectId, ref: 'User' },
    username: { type: String },
    commission: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    sales: { type: Number, default: 0 },
    status: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    deletedAt: Date,
  },
  { versionKey: false }
);

const AffiliateModel = model('Affiliate', affiliateSchema);

export default AffiliateModel;
