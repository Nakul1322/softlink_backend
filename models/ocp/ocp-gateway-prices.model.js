/* eslint-disable quotes */
import { Schema, model } from "mongoose";

const ocpGatewayPricesSchema = new Schema({
  amount: { type: Number },
  currency: { type: String },
  isActive: { type: Boolean },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: { type: Date },
}, { versionKey: false });

const OCPGatewayPriceModel = model("Ocp_Gateway_Price", ocpGatewayPricesSchema);

export default OCPGatewayPriceModel;
