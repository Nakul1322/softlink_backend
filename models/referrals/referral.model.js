import { Schema, model } from 'mongoose';

const referralSchema = new Schema({
  username: { type: String, unique: true, lowercase: true },
  referrer: { type: String, lowercase: true },
  status: { type: String, default: 'active' },
  value: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: Date,
}, { versionKey: false });

const ReferralModel = model('Referral', referralSchema);

export default ReferralModel;
