import { Schema, model } from 'mongoose';

const sectionSchema = new Schema({
  username: String,
  name: String,
  subsections: [
    {
      type: String,
      unique: true,
    }
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: Date,
}, { versionKey: false, });

const SectionModel = model('Section', sectionSchema);

export default SectionModel;
