import { Schema, model } from 'mongoose';

const paymentIntegrationSchema = new Schema({
  username: { type: String, lowercase: true },
  name: { type: String, lowercase: true },
  publicKey: { type: String, unique: true },
  secretKey: { type: String, unique: true },
  encryptionKey: String,
  secretHash: String,
  status: { type: String, uppercase: true, default: 'ACTIVE' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: Date,
}, { versionKey: false });

const PaymentIntegrationModel = model('Payment_Integration', paymentIntegrationSchema);

export default PaymentIntegrationModel;
