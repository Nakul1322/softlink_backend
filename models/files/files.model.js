import { Schema, model } from "mongoose";

const fileSchema = new Schema(
  {
    username: { type: String, lowercase: true },
    fileName: String,
    ETag: String,
    Location: String,
    fileSize: Number,
    mimeType: { type: String, lowercase: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    deletedAt: Date,
  },
  { versionKey: false }
);

const FileModel = model("File", fileSchema);

export default FileModel;
