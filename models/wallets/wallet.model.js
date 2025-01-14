import { Schema, model } from "mongoose";

const walletSchema = new Schema(
  {
    username: { type: String, lowercase: true },
    userId: String,
    currency: String,
    availableBalance: { type: Number, default: 0 },
    affiliateBalance: { type: Number, default: 0 },
    ledgerBalance: { type: Number, default: 0 },
    totalAmountReceived: { type: Number, default: 0 },
    totalAmountTransferred: { type: Number, default: 0 },
    totalAmountRefunded: { type: Number, default: 0 },
    transactionCount: { type: Number, default: 0 },
    creditCount: { type: Number, default: 0 },
    debitCount: { type: Number, default: 0 },
    refundCount: { type: Number, default: 0 },
    isDormant: { type: Boolean, default: false },
    isLimited: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    deletedAt: Date,
  },
  { versionKey: false }
);

const WalletModel = model("Wallet", walletSchema);

export default WalletModel;
