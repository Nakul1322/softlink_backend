import mongoose, { Schema, model } from 'mongoose';

const beneficiarySchema = new Schema(
  {
    beneficiaryId: { type: Number, unique: true },
    userId: String, //mongoose.SchemaTypes.ObjectId, //Schema.Types.ObjectId
    username: String,
    fullName: String,
    accountNumber: String,
    bankName: String,
    bankCode: String,
    currency: { type: String, default: 'NGN' },
    isVerified: { type: Boolean, default: false },
    status: { type: String, default: 'active' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    deletedAt: Date,
  },
  { versionKey: false }
);

const BeneficiaryModel = model('Beneficiary', beneficiarySchema);

export default BeneficiaryModel;
