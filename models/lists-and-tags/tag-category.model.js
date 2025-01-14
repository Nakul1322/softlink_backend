import { Schema, model } from 'mongoose';

const tagCategorySchema = new Schema({
  username: { type: String, lowercase: true },
  name: { type: String, unique: true },
  children: Array,
  expires: { type: Object, default: {}},
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: Date,
}, { versionKey: false });

const TagCategory = model('Tag_Category', tagCategorySchema);

export default TagCategory;
