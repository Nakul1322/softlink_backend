import { Schema, model } from 'mongoose';

const membershipAccessLevelsSchema = new Schema({
  username: { type: String },
  name: { type: String },
  // membershipAccesses: [{ type: Schema.Types.ObjectId, ref: 'Membership_access' }],
  level: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: Date,
}, { versionKey: false });

// membershipAccessLevelsSchema.index({ username: 1, name: 1 }, { unique: true });

const MembershipAccessLevelModel = model('Membership_Access_Level', membershipAccessLevelsSchema);

export default MembershipAccessLevelModel;
