import { Schema, model } from 'mongoose';

const emailSchema = new Schema({
  username: { type: String, lowercase: true },
  fromName: String,
  fromEmail: String,
  replyTo: String,
  subject: { type: String },
  body: String,
  previewText: String,
  contentType: String,
  recipients: [
    {
      email: { type: String, lowercase: true },
      createdAt: { type: Date, default: Date.now },
    }
  ],
  recipientsList: [],
  variables: [],
  standalone: Boolean,
  category: { type: String, lowercase: true },
  type: String,
  status: String,
  schedule: {
    type: {},
    config: {},
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: Date,
}, { versionKey: false });

const emailModel = model('Email', emailSchema);

export default emailModel;
