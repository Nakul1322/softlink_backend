import userRegistrationSchema from './profile/user-registration.schema';
import withdrawalSchema from './wallets/withdrawal.schema';
import grantUserAccessSchema from './grant-user-access.schema';
import userLoginSchema from './profile/user-login.schema';
import confirmAccountSchema from './confirm-account.schema';
import forgotPasswordSchema from './forgot-password.schema';
import resetPasswordSchema from './reset-password.schema';
import deletePageSchema from './delete-page.schema';
import pageSettingsSchema from './page-settings.schema';
import fileUploadSchema from './file-upload.schema';
import subscriptionSchema from './subscription/subscription.schema';
import customDomainSchema from './custom-domain.schema';
import workspaceSchema from './profile/workspace.schema';
import affiliateBalanceSchema from './affiliate-balance.schema';
import changeSubscriptionSchema from './subscription/change-subscription.schema';
import addIntegrationSchema from './add-integration.schema';
import addBookingIntegrationSchema from './add-booking-integration.schema';
import checkBookingIntegrationSchema from './check-booking-integration.schema';
import updateCardSchema from './update-card.schema';
import addListsAndTagsSchema from './lists-and-tags.schema';
import newTagCategorySchema from './lists-and-tags/new-tag-category.schema';
import createPageSchema from './create-page.schema';
import updatePageSchema from './update-page.schema';
import createLeadSchema from './leads/create-lead.schema';
import editLeadSchema from './leads/edit-lead.schema';
import editLeadBySelfSchema from './leads/edit-lead-by-self.schema';
import deleteSomeLeadsSchema from './leads/delete-some-leads.schema';
import uploadLeadsSchema from './leads/upload-leads.schema';
import verifyLeadsSchema from './leads/verify-leads.schema';
import addTagsToParentCategorySchema from './lists-and-tags/add-tags-to-parent-category.schema';
import deleteTagFromParentCategorySchema from './lists-and-tags/delete-tag-from-parent-category.schema';
import savePageVisitLogsSchema from './save-page-visit-logs.schema';
import addNoteSchema from './add-note.schema';
import getPageAnalyticsReportSchema from './page-analytics/get-page-analytics-report.schema';
import listSchema from './lists.schema';
import createEmailSchema from './emails/create-email.schema';
import sendEmailSchema from './emails/send-email.schema';
import editEmailSchema from './emails/edit-email.schema';
import emailSubscriptionStatusSchema from './emails/email-subscription-status.schema';
import getTemplatesSchema from './templates/get-templates.schema';
import getAllCategoriesSchema from './get-all-categories.schema';
import assignHomePageSchema from './domains/assign-home-page.schema';
import unAssignHomePageSchema from './domains/unassign-home-page.schema';
import paginationSchema from './pagination.schema';
import bookingScheduleSchema from './bookingSchedule.schema';
import createShopSchema from './shops/create-shop.schema';
import getOneShopSchema from './shops/get-one-shop.schema';
import deleteShopSchema from './shops/delete-shop.schema';
import editShopSchema from './shops/edit-shop.schema';
import fxRatesSchema from './fx-rates.schema';
import addProductSchema from './products/add-product.schema';
import getOneProductSchema from './products/get-one-product.schema';
import getAllProductsSchema from './products/get-all-products.schema';
import productQuerySchema from './products/product-query.schema';
import deleteProductSchema from './products/delete-product.schema';
import editProductSchema from './products/edit-product.schema';
import createOrderSchema from './orders/create-order.schema';
import modifyOrderStatusSchema from './orders/modify-order-status.schema';
import addSlugSchema from './slugs/add-slug-schema';
import addSectionSchema from './sections/add-section.schema';
import addOrRemoveSubsectionSchema from './sections/add-or-remove-subsection.schema';
import editDeliveryFeesSchema from './profile/edit-delivery-fees.schema';
import addPickupAddressSchema from './profile/add-pickup-address.schema';
import addVariableSchema from './product-variables/create-product-variable.schema';
import createOrUpdateProductInventorySchema from './product-inventories/create-product-inventories.schema';
import updateInventoryVariantsSchema from './product-inventories/update-product-inventory-variants.schema';
import updateVariablesSchema from './product-variables/update-product-variable.schema';
import getBatchProductsSchema from './products/get-batch-products.schema';
import getOneWalletSchema from './wallets/get-one-wallet.schema';
import createStripeCheckoutSessionSchema from './stripe/create-checkout-session.schema';
import createStripePaymentIntentSchema from './stripe/create-payment-intent.schema';
import getActiveSubscriptionSchema from './subscription/get-active-subscription.schema';
import subscriptionSpecialActionsSchema from './subscription/subscription-special-actions.schema';
import cronListenerSchema from './webhooks/cron-listener.schema';
import createMembershipSchema from './membership/create-membership.schema';
import createMembershipMemberSchema from './membership/create-membership-member.schema';
import createMembershipPostCommentSchema from './membership/create-membership-post-comment.schema';
import createMembershipPostCommentReplySchema from './membership/create-membership-post-comment-reply.schema';
import createOCPSchema from './ocp/create-ocp.schema';
import getOneOCP from './ocp/ocp-get-one.schema';
import createUsageCountSchema from './usage-count/create-usage-count.schema';
import createUsageCountMemberSchema from './usage-count/create-usage-count-member.schema';
import updateUsageCountMemberSchema from './usage-count/usage-count-member-update.schema';
import createAffiliateSchema from './affiliates/affiliates.schema';

export default {
  withdrawalSchema,
  grantUserAccessSchema,
  userRegistrationSchema,
  userLoginSchema,
  confirmAccountSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  deletePageSchema,
  pageSettingsSchema,
  fileUploadSchema,
  subscriptionSchema,
  customDomainSchema,
  workspaceSchema,
  affiliateBalanceSchema,
  changeSubscriptionSchema,
  addIntegrationSchema,
  addBookingIntegrationSchema,
  checkBookingIntegrationSchema,
  updateCardSchema,
  addListsAndTagsSchema,
  createPageSchema,
  updatePageSchema,
  newTagCategorySchema,
  deleteSomeLeadsSchema,
  uploadLeadsSchema,
  verifyLeadsSchema,
  addTagsToParentCategorySchema,
  deleteTagFromParentCategorySchema,
  savePageVisitLogsSchema,
  createLeadSchema,
  editLeadSchema,
  editLeadBySelfSchema,
  addNoteSchema,
  getPageAnalyticsReportSchema,
  listSchema,
  createEmailSchema,
  sendEmailSchema,
  editEmailSchema,
  emailSubscriptionStatusSchema,
  getTemplatesSchema,
  getAllCategoriesSchema,
  assignHomePageSchema,
  unAssignHomePageSchema,
  paginationSchema,
  bookingScheduleSchema,
  createShopSchema,
  getOneShopSchema,
  deleteShopSchema,
  editShopSchema,
  fxRatesSchema,
  addProductSchema,
  getOneProductSchema,
  getBatchProductsSchema,
  getAllProductsSchema,
  productQuerySchema,
  deleteProductSchema,
  editProductSchema,
  createOrderSchema,
  modifyOrderStatusSchema,
  addSlugSchema,
  addSectionSchema,
  addOrRemoveSubsectionSchema,
  editDeliveryFeesSchema,
  addPickupAddressSchema,
  addVariableSchema,
  createOrUpdateProductInventorySchema,
  updateInventoryVariantsSchema,
  updateVariablesSchema,
  getOneWalletSchema,
  createStripeCheckoutSessionSchema,
  createStripePaymentIntentSchema,
  getActiveSubscriptionSchema,
  subscriptionSpecialActionsSchema,
  cronListenerSchema,
  createMembershipSchema,
  createMembershipMemberSchema,
  createOCPSchema,
  getOneOCP,
  createUsageCountSchema,
  createUsageCountMemberSchema,
  updateUsageCountMemberSchema,
  createMembershipPostCommentSchema,
  createMembershipPostCommentReplySchema,
  createAffiliateSchema,
};
