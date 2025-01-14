import { Schema, model } from 'mongoose';

const bookingIntegrationSchema = new Schema({
  username: { type: String, lowercase: true },
  name: { type: String, lowercase: true },
  accessToken: { type: String, unique: true },
  uri: { type: String, unique: true },
  status: { type: String, uppercase: true, default: 'ACTIVE' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: Date,
}, { versionKey: false });

const BookingIntegrationModel = model('Booking_Integration', bookingIntegrationSchema);

export default BookingIntegrationModel;
