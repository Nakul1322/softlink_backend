import { Schema, model } from "mongoose";

const subDomainSchema = new Schema(
  {
    username: { type: String, lowercase: true },
    FQDN: { type: String, unique: true, lowercase: true },
    subDomain: String,
    domain: String,
    hostedZoneId: String,
    status: { type: String, uppercase: true, default: "SUCCESS" },
  },
  {
    timestamps: true,
  }
);

const SubDomainModel = model("Sub_Domain", subDomainSchema);

export default SubDomainModel;
