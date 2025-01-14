import { Schema, model } from 'mongoose';

const usageCountModelSchema = new Schema({
  username: { type: String },
  name: { type: String },
  countNumber: { type: Number, default: 0 },
  timePeriod: { type: Number, default: 0 },
  rollOver: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { versionKey: false });

const UsageCountModel = model('Usage_Count', usageCountModelSchema);

export default UsageCountModel;
