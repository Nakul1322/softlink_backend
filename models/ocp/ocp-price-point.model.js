/* eslint-disable quotes */
import { Schema, model } from "mongoose";

const ocpPricePointSchema = new Schema({
  title: { type: String },
  pricePointType: {
    typeOption: String,
    reoccurence: { type: String, default: null },
    installments: { type: Number, default: 0 },
  },
  description: { type: String },
  destination: { type: String },
  gateway: [{ type: Schema.Types.ObjectId, ref: 'Ocp_Gateway' }],
  thankyouPage: { type: String },
  cartAbandonment: [{ type: String }],
  lists: { type: Array, default: [] },
  tags: { type: Array, default: [] },
  initialPayment: { type: Boolean },
  isDefaultPrice: { type: Boolean },
  isExternalUrl: { type: Boolean },
  membership: {
    id: String,
    accessId: String,
    expireAt: Date,
    expireIn: Number,
  },
  usageCount: {
    id: String,
    countNumber: Number,
    timePeriod: Number,
  },
  upSell: {
    product: { type: Schema.Types.ObjectId, ref: 'Product' },
    price: { type: Schema.Types.ObjectId, ref: 'ProductPrice' },
    headline: { type: String, default: null },
    description: { type: String, default: null },
    preview: { type: String, default: "1" },
    thumbnail: { type: Boolean, default: false },
    bouncingArrow: { type: Boolean, default: false },
  },
  orderSuccessfulEmailID: { type: Schema.Types.ObjectId, default: null },
  cartAbandonmentEmailID: { type: Schema.Types.ObjectId, default: null },
  downloadableFile: { type: String },
  retry: { type: Number, default: 1 },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: { type: Date },
}, { versionKey: false });

const OCPPricePointModel = model("Ocp_Price_Point", ocpPricePointSchema);

export default OCPPricePointModel;
