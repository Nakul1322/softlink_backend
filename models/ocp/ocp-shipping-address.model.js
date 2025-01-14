/* eslint-disable quotes */
import { Schema, model } from "mongoose";

const ocpShippingAddressSchema = new Schema({
  address: { type: String },
  amount: { type: Number },
  currency: { type: String },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: { type: Date },
}, { versionKey: false });

const OCPShippingAddressModel = model("Ocp_Shipping_Address", ocpShippingAddressSchema);

export default OCPShippingAddressModel;
