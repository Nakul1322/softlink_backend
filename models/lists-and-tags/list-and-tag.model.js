import { Schema, model } from 'mongoose';

const listAndTagSchema = new Schema({
  username: { type: String, unique: true, lowercase: true },
  listGroups: Array,
  tagCategories: Array,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: Date,
}, { versionKey: false });

const ListAndTagModel = model('List_And_Tag', listAndTagSchema);

export default ListAndTagModel;
