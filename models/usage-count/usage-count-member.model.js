import { Schema, model } from 'mongoose';

const usageCountMemberSchema = new Schema({
  username: { type: String },
  usageCount: { type: Schema.Types.ObjectId, ref: 'Usage_Count' },
  email: { type: String },
  allocatedCount: { type: Number, default: 0 }, //  { type: Object, default: {} },
  usedCount: { type: Number, default: 0 },
  availableCount: { type: Number, default: 0 },
  expireAt: { type: Date },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: Date,
}, { versionKey: false });

const UsageCountMemberModel = model('Usage_Count_Member', usageCountMemberSchema);

export default UsageCountMemberModel;
