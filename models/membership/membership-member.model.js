import { Schema, model } from 'mongoose';

const membershipAccessSubSchema = new Schema({
  access: { type: Schema.Types.ObjectId, ref: 'Membership_Access' },
  expireAt: { type: Date, default: null },
  completedPost: [{ type: Schema.Types.ObjectId, ref: 'Membership_Post' }],
  createdAt: { type: Date, default: Date.now },
  preOrderPost: [{ type: Schema.Types.ObjectId, ref: 'Membership_Post', default: null }],
  randomPosts: [{ type: Schema.Types.ObjectId, default: [], ref: 'Membership_Post' }],
  isActive: { type: Boolean, default: true },
}, { _id: false, versionKey: false });

const membershipMemberSchema = new Schema({
  username: { type: String },
  email: { type: String },
  password: { type: String },
  pass: { type: String },
  progress: { type: Object, default: {} },
  progressLevel: { type: Number, default: 0 },
  membershipAccesses: [membershipAccessSubSchema],
  membershipId: { type: Schema.Types.ObjectId, ref: 'Membership' },
  lead: { type: Schema.Types.ObjectId, ref: 'Lead' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: Date,
}, { versionKey: false });

// membershipMemberSchema.index({ username: 1, membershipId: 1, email: 1 }, { unique: true });

const MembershipMemberModel = model('Membership_member', membershipMemberSchema);

export default MembershipMemberModel;
