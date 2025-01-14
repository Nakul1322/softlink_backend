
import { Schema, model } from 'mongoose';

const productVariablesSchema = new Schema({
  username: { type: String },
  name: String,
  options: {
    type: Array, default: []
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: Date,
}, { versionKey: false });

const ProductVariablesModel = model('Product_variable', productVariablesSchema);

export default ProductVariablesModel;
