import { Schema, model } from 'mongoose';

const bookingAppointmentSchema = new Schema({
  username: { type: String, lowercase: true },
  bookingId: { type: String, lowercase: true },
  invitee: { type: String, lowercase: true },
  event: { type: String, lowercase: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: Date,
}, { versionKey: false });

bookingAppointmentSchema.index({username: 1,bookingId:1,invitee:1,event:1},{unique: true})

const BookingAppointmentModel = model('Booking_Appointment', bookingAppointmentSchema);

export default BookingAppointmentModel;
