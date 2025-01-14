import { Schema, model } from 'mongoose';
import { GUARDS } from '../../helpers/constants';

const subscriptionSchema = new Schema(
  {
    username: String,
    subscriptionPackage: String,
    plan: String,
    currency: { type: String, default: 'NGN' },
    amount: Number,
    status: { type: String, default: 'active' },
    retry: {
      is: Number,
      date: Date,
    },
    meta: String,
    subscriptionDate: Date,
    subscriptionExpiry: Date,
    subscriptionPauseDate: Date,
    proRated: { type: Boolean, default: false },
    type: { type: String, default: GUARDS.SUBSCRIPTION_ACTIONS.subscribe },
    subscriptionSwitchRequest: {
      switchType: String,
      subscriptionPackage: String,
      plan: String,
      amount: Number,
      switchDate: Date,
      status: { type: String, default: null },
    },
    extended: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    cancelledAt: Date,
  },
  { versionKey: false }
);

const SubscriptionModel = model('Subscription', subscriptionSchema);

export default SubscriptionModel;
