import { Schema, model } from 'mongoose';

const orderSchema = new Schema(
  {
    username: String,
    status: String,
    products: [
      {
        _id: Schema.ObjectId,
        id: Schema.ObjectId,
        images: Array,
        currency: String,
        name: String,
        description: String,
        pricePointId: { type: Schema.Types.ObjectId, default: null },
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
    paymentReference: String,
    transactionFee: Number,
    deliveryFee: Number,
    total: Number,
    quantity: Number,
    orderType: { type: String, default: 'first-time' },
    customer: {
      name: String,
      email: String,
      phoneNumber: String,
      address: String,
      notes: String,
      delivery: String,
    },
    shopId: Schema.ObjectId,
    orderNumber: String,
    history: [
      {
        status: String,
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
      },
    ],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    cancelledAt: Date,
  },
  { versionKey: false }
);

const OrderModel = model('Order', orderSchema);

export default OrderModel;
