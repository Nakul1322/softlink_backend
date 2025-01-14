import UserModel from './users/user.model';
import LeadModel from './leads/leads.model';
import SubscriptionModel from './subscription/subscription.model';
import PageModel from './pages/pages.model';
import WalletModel from './wallets/wallet.model';
import TransactionModel from './transactions/transaction.model';
import BeneficiaryModel from './beneficiaries/beneficiary.model';
import FileModel from './files/files.model';
import DomainModel from './domains/domain.model';
import SubDomainModel from './sub-domains/sub-domain.model'
import ReferralModel from './referrals/referral.model';
import AffiliateModel from './affiliates/affiliates.model';
import AffiliateSaleModel from './affiliates/affiliates-sales.model';
import PaymentIntegrationModel from './payment-integrations/payment-integration.model';
import BookingIntegrationModel from './booking-integrations/booking-integration.model';
import BookingAppointmentModel from './booking-appointments/booking-appointment.model';
import PaymentMethodModel from './payment-methods/payment-method.model';
import ListAndTagModel from './lists-and-tags/list-and-tag.model';
import TagCategoryModel from './lists-and-tags/tag-category.model';
import ListModel from './lists/lists.model';
import emailModel from './emails/email.model';
import shopModel from './shop/shop.model';
import productModel from './products/product.model';
import productPriceModel from './products/product-price.model';
import OrderModel from './orders/order.model';
import SectionModel from './sections/section.model';
import PendingTxnModel from './pendng-txns/pending-txn.model';
import ProductVariablesModel from './product-variables/product-variables.model';
import ProductInventoryModel from './product-inventories/product-inventories.model';
import MembershipModel from './membership/membership.model';
import MembershipAccessLevelModel from './membership/membership-access-levels.model';
import MembershipAccessModel from './membership/membership-access.model';
import MembershipContentModel from './membership/membership-content.model';
import MembershipMemberModel from './membership/membership-member.model';
import MembershipPostModel from './membership/membership-posts.model';
import MembershipPostCommentModel from './membership/membership-post-comments.model';
import MembershipPostCommentReplyModel from './membership/membership-post-comment-replies.model';
import OCPModel from './ocp/ocp.model';
import OCPPricePointModel from './ocp/ocp-price-point.model';
import OCPGatewayModel from './ocp/ocp-gateways.model';
import OCPGatewayPriceModel from './ocp/ocp-gateway-prices.model';
import OCPShippingAddressModel from './ocp/ocp-shipping-address.model';
import UsageCountModel from './usage-count/usage-count.model';
import UsageCountMemberModel from './usage-count/usage-count-member.model';
import UsageCountMemberLogModel from './usage-count/usage-count-logs.model';
import OCPOrderModel from './ocp/ocp-order.model';

export default {
  User: UserModel,
  Lead: LeadModel,
  Subscription: SubscriptionModel,
  Page: PageModel,
  Wallet: WalletModel,
  Transaction: TransactionModel,
  Beneficiary: BeneficiaryModel,
  File: FileModel,
  Domain: DomainModel,
  SubDomain: SubDomainModel,
  Referral: ReferralModel,
  Affiliate: AffiliateModel,
  AffiliateSale: AffiliateSaleModel,
  PaymentIntegration: PaymentIntegrationModel,
  BookingIntegration: BookingIntegrationModel,
  BookingAppointment: BookingAppointmentModel,
  PaymentMethod: PaymentMethodModel,
  ListAndTag: ListAndTagModel,
  TagCategory: TagCategoryModel,
  List: ListModel,
  Email: emailModel,
  Shop: shopModel,
  Product: productModel,
  ProductPrice: productPriceModel,
  Order: OrderModel,
  Section: SectionModel,
  PendingTxn: PendingTxnModel,
  ProductVariable: ProductVariablesModel,
  ProductInventory: ProductInventoryModel,
  Membership: MembershipModel,
  MembershipAccessLevel: MembershipAccessLevelModel,
  MembershipAccess: MembershipAccessModel,
  MembershipContent: MembershipContentModel,
  MembershipMember: MembershipMemberModel,
  MembershipPost: MembershipPostModel,
  MembershipPostComment: MembershipPostCommentModel,
  MembershipPostCommentReply: MembershipPostCommentReplyModel,
  OCP: OCPModel,
  OCPPricePoint: OCPPricePointModel,
  OCPGateway: OCPGatewayModel,
  OCPGatewayPrice: OCPGatewayPriceModel,
  OCPShippingAddress: OCPShippingAddressModel,
  OCPOrder: OCPOrderModel,
  UsageCount: UsageCountModel,
  UsageCountMember: UsageCountMemberModel,
  UsageCountMemberLog: UsageCountMemberLogModel
};
