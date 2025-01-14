import { Schema, model } from 'mongoose';

const productInventorySchema = new Schema({
  username: { type: String },
  productId: { type: Schema.Types.ObjectId, ref: 'Product' },
  variables: [{ }],
  variants: [{}],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: Date,
}, { versionKey: false });

const ProductInventoryModel = model('Product_inventory', productInventorySchema);

export default ProductInventoryModel;
