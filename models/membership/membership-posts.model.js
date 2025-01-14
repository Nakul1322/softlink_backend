import { Schema, model } from 'mongoose';

const membershipPostSchema = new Schema({
  username: { type: String },
  name: { type: String },
  membershipId: { type: Schema.Types.ObjectId },
  content: JSON,
  //   expireAt: { type: Date, default: null },
  //   expireIn: { type: Number, default: null },
  //   accessLevelsId: [{ type: Schema.Types.ObjectId,  ref: 'Membership_access_level' }],
  // TODO: define if required additional fields
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: Date,
}, { versionKey: false });

// membershipPostSchema.index({ username: 1, membershipId: 1, name: 1 }, { unique: true });

const MembershipPostModel = model('Membership_Post', membershipPostSchema);

export default MembershipPostModel;
