import { Schema, model } from 'mongoose';
import { AFFILIATE } from '../../helpers/constants';

const {
  defaults: { bonus, level },
} = AFFILIATE;

const userSchema = new Schema(
  {
    firstName: { type: String, default: 'Anonymous' },
    lastName: { type: String, default: 'Cat' },
    email: { type: String, unique: true, lowercase: true },
    password: String,
    username: { type: String, lowercase: true },
    photoURL: String,
    phoneNumber: { type: String, match: /[+0-9]/ },
    location: String,
    referral: {
      count: { type: Number, default: 0 },
      level: { type: String, default: level },
      bonus: { type: Number, default: bonus },
    },
    referrer: {
      username: { type: String, lowercase: true },
      discountApplied: Boolean,
    },
    stripeCustomerId: String,
    verifiedStripeCustomerId: String,
    businessDetails: {
      name: String,
      country: String,
      address: String,
      logoURL: String,
      phoneNumber: String,
      deliveryFees: [{ location: String, price: Number, currency: String }],
      pickupAddresses: [
        {
          name: String,
          location: String,
          price: Number,
          currency: String,
          createdAt: { type: Date, default: Date.now },
          updatedAt: { type: Date, default: Date.now },
        },
      ],
    },
    roles: { type: Array, default: ['user'] },
    isConfirmed: { type: Boolean, default: false },
    isSubscribed: { type: Boolean, default: false },
    subscriptionPackage: { type: String, default: 'free' },
    subscriptionPackageBeforePause: { type: String, default: null },
    plan: { type: String, default: 'limited' }, // changing from infinity to limited
    recentlyDowngraded: { type: Boolean, default: false },
    status: { type: String, default: 'active' },
    // canceledOn: { type: Date, default: new Date("1970-01-01T00:00:00.000Z") },
    subscriptionDate: { type: Date, default: Date.now() },
    subscriptionExpiry: { type: Date, default: null },
    emailSubscription: { type: Boolean, default: true },
    subscriptionPauseDate: Date,
    lastLogin: { type: Date, default: null }, // in UTC
    sessionStart: { type: Date, default: null }, // in UTC
    lastSeen: { type: Date, default: null }, // in UTC
    lastSession: { type: Number, default: 0 }, // in seconds
    totalSession: { type: Number, default: 0 }, // in seconds
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    deletedAt: Date,
    removeBranding: { type: Boolean, default: false },
    isOnboarded: Boolean,
    userDescription: String,
    sendFollowUpEmail: {
      forms_email_customer: { type: Boolean, default: true },
      forms_email_me: { type: Boolean, default: true },
      transaction_email_customer: { type: Boolean, default: true },
      transaction_email_me: { type: Boolean, default: true },
    },
    isVerified: { type: Boolean, default: false },
  },
  { versionKey: false }
);

const UserModel = model('User', userSchema);

export default UserModel;
