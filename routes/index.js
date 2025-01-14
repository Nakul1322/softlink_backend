import indexRouter from './api/index.router';
import authRouter from './api/auth.router.';
import subscriptionRouter from './api/subscription.router';
import profileRouter from './api/profile.router';
import pageRouter from './api/page.router';
import walletRouter from './api/wallet.router';
import appointmentsRouter from './api/appointments.router';
import transactionRouter from './api/transaction.router';
import userManagementRouter from './api/adminRoutes/userManagement.router';
import pageManagementRouter from './api/adminRoutes/pageManagement.router';
import fileRouter from './api/file.router';
import bookingRouter from './api/booking.router';
import customDomainRouter from './api/domain.router';
import affiliateRouter from './api/affiliate.router';
import paymentIntegrationRouter from './api/payment-integration.router';
import bookingIntegrationRouter from './api/booking-integration.router';
import templateRouter from './api/template.router';
import webhookRouter from './api/webhook.router';
import beneficiariesRouter from './api/beneficiary.router';
import listAndTagRouter from './api/list-and-tag.router';
import noteRouter from './api/notes.router';
import listRouter from './api/lists.router';
import leadRouter from './api/lead.router';
import emailRouter from './api/email.router';
import shopRouter from './api/shop.router';
import productRouter from './api/product.router';
import orderRouter from './api/order.router';
import slugRouter from './api/slug.router';
import sectionRouter from './api/section.router';
import stripeRouter from './api/stripe.router';
import membershipRouter from './api/membership.router';
import ocpRouter from './api/ocp.router';
import usageCountRouter from './api/usage-count.router';
import commentRouter from './api/comment.router';

export default [
  indexRouter,
  authRouter,
  subscriptionRouter,
  profileRouter,
  pageRouter,
  walletRouter,
  appointmentsRouter,
  transactionRouter,
  userManagementRouter,
  pageManagementRouter,
  bookingRouter,
  fileRouter,
  customDomainRouter,
  affiliateRouter,
  paymentIntegrationRouter,
  bookingIntegrationRouter,
  templateRouter,
  webhookRouter,
  beneficiariesRouter,
  listAndTagRouter,
  noteRouter,
  listRouter,
  leadRouter,
  emailRouter,
  shopRouter,
  productRouter,
  orderRouter,
  slugRouter,
  sectionRouter,
  stripeRouter,
  membershipRouter,
  ocpRouter,
  usageCountRouter,
  commentRouter,
];
