import { Schema, model } from 'mongoose';

const membershipPostCommentSchema = new Schema({
  username: { type: String },
  membershipId: { type: Schema.Types.ObjectId, ref: 'Membership' },
  post: { type: Schema.Types.ObjectId, ref: 'Membership_Post' },
  member: { type: Schema.Types.ObjectId, ref: 'Lead' },
  text: { type: String },
  status: { type: String },
  isActive: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: { type: Date },
}, { versionKey: false });

// membershipPostCommentSchema.index({ username: 1, membershipId: 1, postId: 1 }, { unique: true });

const MembershipPostCommentModel = model('Membership_Post_Comment', membershipPostCommentSchema);

export default MembershipPostCommentModel;

// comments: [{
//   member: { type: Schema.Types.ObjectId, ref: 'Membership_Member' },
//   date: Date,
//   text: String,
//   isActive: { type: Boolean, default: false },
// }],
