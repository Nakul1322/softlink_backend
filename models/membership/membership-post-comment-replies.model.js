import { Schema, model } from 'mongoose';

const membershipPostCommentRepliesSchema = new Schema({
  username: { type: String },
  membershipId: { type: Schema.Types.ObjectId, ref: 'Membership' },
  post: { type: Schema.Types.ObjectId, ref: 'Membership_Post' },
  comment: { type: Schema.Types.ObjectId, ref: 'Membership_Post_Comment' },
  member: { type: Schema.Types.ObjectId, ref: 'Lead' },
  text: { type: String },
  status: { type: String },
  isActive: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: { type: Date },
}, { versionKey: false });

const MembershipPostCommentRepliesModel = model('Membership_Post_Comment_Replies', membershipPostCommentRepliesSchema);

export default MembershipPostCommentRepliesModel;
