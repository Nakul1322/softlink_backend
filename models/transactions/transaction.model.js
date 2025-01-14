import { Schema, model } from 'mongoose';

const transactionSchema = new Schema(
  {
    payee: {
      _id: String,
      username: String,
      walletId: String,
    },
    customer: {
      name: String,
      email: { type: String, lowercase: true },
      phoneNumber: { type: String, default: '' },
    },
    currency: { type: String, default: 'NGN', uppercase: true },
    gateway: String,
    amount: Number,
    transactionType: { type: String, default: 'CREDIT', uppercase: true },
    transactionFee: Number,
    paymentSource: { type: String, uppercase: true },
    paymentReference: { type: String, unique: true },
    orderNumber: String,
    status: { type: String, default: 'PENDING', uppercase: true },
    tag: String,
    message: String,
    notes: {
      originalCurrency: { type: String, uppercase: true },
      originalAmount: Number,
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    deletedAt: Date,
  },
  { versionKey: false }
);

const TransactionModel = model('Transaction', transactionSchema);

export default TransactionModel;
