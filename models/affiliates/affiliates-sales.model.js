import { Schema, model } from 'mongoose';

const affiliateSaleSchema = new Schema(
  {
    affiliateCode: { type: String },
    amount: { type: Number },
    order: { type: Schema.Types.ObjectId, ref: 'Order' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    deletedAt: Date,
  },
  { versionKey: false }
);

const AffiliateSaleModel = model('AffiliateSale', affiliateSaleSchema);

export default AffiliateSaleModel;
