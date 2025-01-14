import { Schema, model } from 'mongoose';

const listSchema = new Schema({
  username: { type: String, lowercase: true },
  name: { type: String },
  description: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: Date,
}, { versionKey: false });

const ListModel = model('List', listSchema);

export default ListModel;
