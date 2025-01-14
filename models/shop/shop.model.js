import { Schema, model } from 'mongoose';

const shopSchema = new Schema({
  username: { type: String, lowercase: true },
  name: String,
  title: String,
  description: String,
  pickupAddress: String,
  imageUrl: String,
  theme: String,
  delivery: [
    {
      location: String,
      price: Number,
      currency: String,
    }
  ],
  facebookPixelId: String,
  selectedCustomDomain: String,
  currency: [{ type: String, uppercase: true }],
  curren: { type: String, uppercase: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: Date,
}, { versionKey: false });

const ShopModel = model('Shop', shopSchema);

export default ShopModel;
// currency: [{ type: String, uppercase: true }],
