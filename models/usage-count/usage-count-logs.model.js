import { Schema, model } from 'mongoose';

const usageCountMemberLogSchema = new Schema({
  username: { type: String },
  usageCount: { type: Schema.Types.ObjectId, ref: 'Usage_Count' },
  email: { type: String },
  logContent: { type: String, default: null },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: Date,
}, { versionKey: false });

const UsageCountMemberLogModel = model('Usage_Count_Member_Log', usageCountMemberLogSchema);

export default UsageCountMemberLogModel;
