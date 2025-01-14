/* eslint-disable quotes */
import { Schema, model } from "mongoose";
// [{ type: Schema.Types.ObjectId, ref: "ProductPrice" }],
const productSchema = new Schema(
  {
    username: String,
    name: String,
    title: String,
    description: String,
    price: [{ type: Schema.Types.ObjectId, ref: "ProductPrice" }],
    newPrice: [{ type: Schema.Types.ObjectId, ref: "ProductPrice" }],
    delivery: [
      {
        location: String,
        price: Number,
        currency: String,
      },
    ],
    isActive: { type: Boolean, default: true },
    quantity: Number,
    category: String,
    subcategory: String,
    section: String,
    subsection: String,
    variables: Object,
    images: Array,
    externalUrl: String,
    preOrder: { status: Boolean, date: Date },
    facebookPixelId: String,
    tags: Array,
    list: Array,
    fileIds: Array,
    productType: String,
    productTheme: String,
    shopId: Schema.ObjectId,
    // Membership per price should be in the next versions
    membership: {
      id: String,
      accessId: String,
      expireAt: Date,
      expireIn: Number,
    },
    affiliate: {
      enabled: { type: Boolean, default: false },
      commission: { type: String, default: null },
    },
    facebookMarketSpace: { type: Boolean, default: false },
    selectedCustomDomain: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    deletedAt: Date,
  },
  { versionKey: false }
);

const ProductModel = model("Product", productSchema);

export default ProductModel;
