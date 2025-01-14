/* eslint-disable quotes */
import { Schema, model } from "mongoose";

const ocpSchema = new Schema({
  username: { type: String },
  title: { type: String },
  imageUrl: { type: String },
  internalName: { type: String },
  officialName: { type: String },
  description: { type: String },
  productTheme: { type: String },
  pricePoints: [{ type: Schema.Types.ObjectId, ref: 'Ocp_Price_Point' }],
  defaultPricePoint: { type: Schema.Types.ObjectId },
  shippingCost: [{ type: Schema.Types.ObjectId, ref: 'Ocp_Shipping_Address' }],
  salesTax: { type: Boolean, default: false },
  salesPage: {
    isExternalUrl: { type: Boolean, default: false },
    pageTitle: { type: String, default: '' },
    externalUrl: { type: String, default: '' },
  },
  affiliate: {
    enabled: { type: Boolean, default: false },
    commission: { type: String, default: null },
  },
  refundPolicy: { type: String },
  checkoutForm: { type: String },
  quantity: { type: Number, default: -2 },
  termsCondition: {
    terms: { type: String, default: 'no' },
    text: { type: String, default: null },
  },
  upSell: { type: Boolean, default: false },
  contentPage: { type: String },
  isActive: { type: Boolean, default: true },
  isCompleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: { type: Date },
}, { versionKey: false });

const OCPModel = model("Ocp", ocpSchema);

export default OCPModel;
