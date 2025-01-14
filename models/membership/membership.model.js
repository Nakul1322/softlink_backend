import { Schema, model } from 'mongoose';

const membershipModelSchema = new Schema({
  username: { type: String },
  name: { type: String },
  baseUrl: { type: String, unique: true },
  customDomain: { type: String, default: '' },
  description: { type: String },
  secured: { type: Boolean, default: false },
  welcomeEmail: { type: Schema.Types.ObjectId, default: null, ref: 'Email' },
  salesPromotion: { type: String },
  helpdesk: { type: Object, default: null },
  progressBar: { type: Object, default: null },
  comments: { type: Object, default: null },
  tags: { type: Array, default: [] },
  lists: { type: Array, default: [] },
  accesses: [{ type: Schema.Types.ObjectId, ref: 'Membership_Access' }],
  isSetupFinished: { type: Boolean, default: false },
  published: { type: Boolean, default: true },
  lockedPost: {
    pattern: { type: String, default: null },
    modalContent: { type: String, default: null },
  },
  imageUrl: { type: String },
  logoUrl: { type: String },
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  content: { type: Schema.Types.ObjectId, ref: 'Membership_Content' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: Date,
}, { versionKey: false });

// membershipModelSchema.index({ username: 1, name: 1 }, { unique: true });

const MemebershipModel = model('Membership', membershipModelSchema);

export default MemebershipModel;
