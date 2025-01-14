import { Schema, model } from 'mongoose';

const membershipContentSchema = new Schema({
  username: { type: String },
  membershipId: { type: Schema.Types.ObjectId, ref: 'Membership' },
  // posts: [{ type: Schema.Types.ObjectId,  ref: 'Membership_post' }],
  // Used to display root page content
  content: { type: String },
  pages: [{
    url: String,
    content: String,
  }],
  metadata: JSON,
  // TODO: define if required additional fields
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: Date,
}, { versionKey: false });

// membershipContentSchema.index({ username: 1, membershipId: 1 }, { unique: true });

const MembershipContentModel = model('Membership_Content', membershipContentSchema);

export default MembershipContentModel;
