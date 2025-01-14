import Joi from '@hapi/joi';

export default Joi.object({
  username: Joi.string().required(),

  membershipId: Joi.string().required(),

  postId: Joi.string().required(),

  member: Joi.string().required(),

  text: Joi.string().required(),
});

// username: { type: String },
// membershipId: { type: Schema.Types.ObjectId, ref: 'Membership' },
// post: { type: Schema.Types.ObjectId, ref: 'Membership_Post' },
// member: { type: Schema.Types.ObjectId, ref: 'Membership_Member' },
// text: { type: String },
// isActive: { type: Boolean, default: false },
// createdAt: { type: Date, default: Date.now },
// updatedAt: { type: Date, default: Date.now },
// deletedAt: { type: Date },
