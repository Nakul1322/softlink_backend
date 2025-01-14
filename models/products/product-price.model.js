/* eslint-disable quotes */
import { Schema, model } from "mongoose";

const productPriceSchema = new Schema(
  {
    old: Number,
    new: Number,
    currency: String,
  },
  { versionKey: false }
);

const ProductPriceModel = model("ProductPrice", productPriceSchema);

export default ProductPriceModel;
