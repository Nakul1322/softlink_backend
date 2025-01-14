import { Schema, model } from 'mongoose';

const leadSchema = new Schema({
  username: String,
  name: { type: String, default: 'Anonymous Shadow Cat' },
  firstName: { type: String, required: true},
  lastName: { type: String, default: ' '},
  email: { type: String, lowercase: true },
  phoneNumber: { type: String, match: /[+0-9]/ },
  pageId: String,
  tag: String,
  status: { type: String, default: 'NEW', uppercase: true },
  orderNumber: String,
  paymentReference: String,
  price: Number,
  fields: JSON,
  logs: Array,
  source: { type: String, default: 'N/A' },
  lists: { type: Array, default: [] },
  tags: { type: Array, default: [] },
  blacklisted: { type: Boolean, default: false },
  subscribed: { type: Boolean, default: true },
  emailSubscription: { type: Boolean, default: true },
  location: {
    ipAddress: String,
    proxy: { type: Boolean, default: false },
    city: String,
    state: String,
    country: String,
  },
  notes: [
    {
      poster: String,
      comment: String,
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now },
    }
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: Date,
}, { versionKey: false });

leadSchema.index({
  email: 'text',
  name: 'text',
  phoneNumber: 'text'
});

const LeadModel = model('Lead', leadSchema);

export default LeadModel;
