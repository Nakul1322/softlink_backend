import { Schema, model } from "mongoose";

const paymentMethodSchema = new Schema(
  {
    owner: {
      userId: Schema.Types.ObjectId,
      username: { type: String, lowerCase: true },
      email: { type: String, lowerCase: true },
      phoneNumber: { type: String, match: /[+0-9]/ },
    },
    currency: { type: String, default: "NGN", uppercase: true },
    card: {
      first_6digits: String,
      last_4digits: String,
      country: { type: String, uppercase: true },
      type: { type: String, uppercase: true },
      token: String,
      expiry: String,
    },
    gateway: String,
    status: { type: String, default: "active" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    deletedAt: Date,
  },
  { versionKey: false }
);

const PaymentMethodModel = model("Payment_Method", paymentMethodSchema);

export default PaymentMethodModel;
