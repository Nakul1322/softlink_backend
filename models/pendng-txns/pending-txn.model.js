import { Schema, model } from "mongoose";

const typeEnum = [
  "formPayment",
  "orderPayment",
  "subscriptionAutoRenewal",
  "subscriptionExtension",
];

const pendingTxnSchema = new Schema(
  {
    username: String,
    transaction_id: { type: Number, unique: true },
    paymentReference: { type: String, unique: true },
    type: { type: String, enum: typeEnum },
    currency: String,
    pendingAmount: Number,
    transactionFee: Number,
    destinationWallet: String,
    status: { type: String, default: "pending" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    deletedAt: Date,
  },
  { versionKey: false }
);

const PendingTxnModel = model("Pending_Txn", pendingTxnSchema);

export default PendingTxnModel;
