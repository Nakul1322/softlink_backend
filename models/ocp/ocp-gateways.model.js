/* eslint-disable quotes */
import { Schema, model } from "mongoose";

const ocpGatewaysSchema = new Schema({
  name: { type: String },
  publicKey: { type: String },
  price: [{ type: Schema.Types.ObjectId, ref: 'Ocp_Gateway_Price' }],
  initialPayment: [{ type: Schema.Types.ObjectId, ref: 'Ocp_Gateway_Price' }],
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: { type: Date },
}, { versionKey: false });

const OCPGatewayModel = model("Ocp_Gateway", ocpGatewaysSchema);

export default OCPGatewayModel;
