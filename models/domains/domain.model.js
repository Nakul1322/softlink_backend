import { Schema, model } from 'mongoose';

const domainSchema = new Schema({
  username: { type: String, lowercase: true },
  FQDN: { type: String, unique: true, lowercase: true },
  domain: String,
  extension: String,
  nsRecords: Array,
  hostedZoneId: String,
  assignedHomePage: String,
  status: { type: String, uppercase: true, default: 'PENDING' },
  retrySSL: { type: Number, default: 0 },
  reference: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: Date,
}, { versionKey: false });

const DomainModel = model('Domain', domainSchema);

export default DomainModel;
