import { Schema, model } from 'mongoose';

const ocpOrderSchema = new Schema(
  {
    username: String,
    products: [
      {
        _id: Schema.ObjectId,
        id: Schema.ObjectId,
        images: Array,
        name: String,
        description: String,
        pricePointId: { type: Schema.Types.ObjectId },
        type: { type: String },
        addedVariants: Object,
        price: Number,
        quantity: Number,
        subTotal: Number,
        preOrder: {
          status: Boolean,
          date: Date,
        },
      },
    ],
    total: Number,
    quantity: Number,
    customer: {
      name: String,
      email: String,
      phoneNumber: String,
      address: String,
      notes: String,
      delivery: String,
    },
    card: {
      first_6digits: String,
      last_4digits: String,
      country: { type: String, default: null },
      type: String,
      token: String,
      expiry: String,
    },
    gateway: { type: String },
    currency: { type: String },
    shopId: { type: Schema.Types.ObjectId, default: null },
    orderNumber: String,
    retry: { type: Number },
    transactionType: {
      typeOption: String,
      reoccurence: { type: String, default: null },
      installments: { type: Number, default: 0 },
    },
    status: { type: String },
    history: [
      {
        status: String,
        paymentRef: String,
        tries: { type: Number, default: 1 },
        chargedAt: { type: Date },
        expireAt: { type: Date },
      },
    ],
    cancelledAt: { type: Date, default: null },
    nextChargeAt: { type: Date, default: null },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

const OCPOrderModel = model('OCP_Order', ocpOrderSchema);

export default OCPOrderModel;
