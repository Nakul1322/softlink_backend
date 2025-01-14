import { Schema, model } from 'mongoose';

// const membershipPostsSubSchema = new Schema({
//   postId: { type: Schema.Types.ObjectId, ref: 'Membership_Post' },
//   startedIn: { type: Number, default: null }
// }, { _id: false, versionKey: false });

const membershipAccessSchema = new Schema({
  username: { type: String },
  name: { type: String },
  posts: [{ postId: { type: Schema.Types.ObjectId, ref: 'Membership_Post' }, startedIn: { type: Number, default: null }, default: [] }],
  randomInterval: { type: Number, default: null },
  randomPostsAmount: { type: Number, default: null },
  membershipId: { type: Schema.Types.ObjectId, ref: 'Membership' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: Date,
}, { versionKey: false });

// membershipAccessSchema.index({ username: 1, membershipId: 1, membershipsAccessLevel: 1 }, { unique: true });

const MembershipAccessModel = model('Membership_Access', membershipAccessSchema);

export default MembershipAccessModel;
