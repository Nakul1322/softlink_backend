/* eslint-disable no-unused-vars */
import StatusCodes from 'http-status-codes';
import { isEmpty, pick, omit } from 'lodash';
import Response from '../helpers/responseHelper';
import Schemas from './schemas';
import { trimInputs } from '../helpers/utils';
import { MESSAGE, INTERNAL_DOMAINS } from '../helpers/constants';

const {
  createMembershipSchema,
  createMembershipPostCommentSchema,
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
  verifyLeadsSchema,
  uploadLeadsSchema,
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
  editEmailSchema,
  sendEmailSchema,
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
  editProductSchema,
  productQuerySchema,
  deleteProductSchema,
  createOrderSchema,
  addSlugSchema,
  modifyOrderStatusSchema,
  addSectionSchema,
  addOrRemoveSubsectionSchema,
  editDeliveryFeesSchema,
  addPickupAddressSchema,
  editPickupAddressSchema,
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
  createOCPSchema,
  getOneOCP,
  createMembershipMemberSchema,
  createUsageCountSchema,
  createUsageCountMemberSchema,
  updateUsageCountMemberSchema,
  createMembershipPostCommentReplySchema,
  createAffiliateSchema,
} = Schemas;

const { UNPROCESSABLE_ENTITY } = StatusCodes;

const { ACTION_NOT_UNDERSTOOD } = MESSAGE;

export default {
  async createAffiliateSchemaValidator(req, res, next) {
    const form = omit(req.body, ['user']);

    try {
      await trimInputs(form);
      await createAffiliateSchema.validateAsync(form, { abortEarly: false });

      return next();
    } catch (err) {
      return Response.send(res, UNPROCESSABLE_ENTITY, undefined, err.message, 'ERROR');
    }
  },

  async createMembershipValidator(req, res, next) {
    const { body: form } = req;

    try {
      await trimInputs(form);
      await createMembershipSchema.validateAsync(form, { abortEarly: false });

      return next();
    } catch (err) {
      return Response.send(
        res,
        UNPROCESSABLE_ENTITY,
        undefined,
        err.message,
        'ERROR'
      );
    }
  },

  async createMembershipPostCommentSchemaValidator(req, res, next) {
    const { body: form } = req;
    
    try {
      await trimInputs(form);
      await createMembershipPostCommentSchema.validateAsync(form, { abortEarly: false });

      return next();
    } catch (err) {
      return Response.send(
        res,
        UNPROCESSABLE_ENTITY,
        undefined,
        err.message,
        'ERROR'
      );
    }
  },

  async createMembershipPostCommentReplySchemaValidator(req, res, next) {
    const { body: form } = req;

    try {
      await trimInputs(form);
      await createMembershipPostCommentReplySchema.validateAsync(form, { abortEarly: false });

      return next();
    } catch (err) {
      return Response.send(
        res,
        UNPROCESSABLE_ENTITY,
        undefined,
        err.message,
        'ERROR'
      );
    }
  },

  async createMembershipMemberValidator(req, res, next) {
    const form = omit(req.body, ['user']);
    // const { body: form } = req;

    try {
      await trimInputs(form);
      await createMembershipMemberSchema.validateAsync((form), { abortEarly: false });

      return next();
    } catch (err) {
      console.error(err);
      console.error(JSON.stringify(err));
      return Response.send(
        res,
        UNPROCESSABLE_ENTITY,
        undefined,
        err.message,
        'ERROR'
      );
    }
  },

  async createUsageCountValidator(req, res, next) {
    const { body: form } = req;

    try {
      await trimInputs(form);
      await createUsageCountSchema.validateAsync(form, { abortEarly: false });

      return next();
    } catch (err) {
      return Response.send(
        res,
        UNPROCESSABLE_ENTITY,
        undefined,
        err.message,
        'ERROR'
      );
    }
  },

  async createUsageCountMemberValidator(req, res, next) {
    const { body: form } = req;

    try {
      await trimInputs(form);
      await createUsageCountMemberSchema.validateAsync(form, { abortEarly: false });

      return next();
    } catch (err) {
      return Response.send(
        res,
        UNPROCESSABLE_ENTITY,
        undefined,
        err.message,
        'ERROR'
      );
    }
  },

  async updateUsageCountMemberValidator(req, res, next) {
    const { body: form } = req;

    try {
      await trimInputs(form);
      await updateUsageCountMemberSchema.validateAsync(form, { abortEarly: false });

      return next();
    } catch (err) {
      return Response.send(
        res,
        UNPROCESSABLE_ENTITY,
        undefined,
        err.message,
        'ERROR'
      );
    }
  },

  async withdrawalValidator(req, res, next) {
    const form = omit(req.body, ['user']);

    try {
      await trimInputs(form);
      console.log('Awaiting withdrawalValidator...')
      await withdrawalSchema.validateAsync(form, { abortEarly: false });
      console.log('withdrawalValidator passed!')
      return next();
    } catch (err) {
      return Response.send(res, UNPROCESSABLE_ENTITY, undefined, err.message, 'ERROR');
    }
  },

  async grantUserAccessValidator(req, res, next) {
    const { body: form } = req;

    try {
      await trimInputs(form);
      await grantUserAccessSchema.validateAsync(form, { abortEarly: false });

      return next();
    } catch (err) {
      return Response.send(
        res,
        UNPROCESSABLE_ENTITY,
        undefined,
        err.message,
        'ERROR'
      );
    }
  },

  async userRegistrationValidator(req, res, next) {
    const { body: form } = req;

    try {
      await trimInputs(form);
      await userRegistrationSchema.validateAsync(form, { abortEarly: false });

      return next();
    } catch (err) {
      return Response.send(
        res,
        UNPROCESSABLE_ENTITY,
        undefined,
        err.message,
        'ERROR'
      );
    }
  },

  async addInventoryValidator(req, res, next) {
    const form = omit(req.body, ['user']);
    try {
      await trimInputs(form);
      await createOrUpdateProductInventorySchema.validateAsync(form, {
        abortEarly: false,
      });

      return next();
    } catch (err) {
      return Response.send(
        res,
        UNPROCESSABLE_ENTITY,
        undefined,
        err.message,
        'ERROR'
      );
    }
  },

  async updateInventoryVariantsValidator(req, res, next) {
    const form = omit(req.body, ['user']);
    try {
      await trimInputs(form);
      await updateInventoryVariantsSchema.validateAsync(form, {
        abortEarly: false,
      });

      return next();
    } catch (err) {
      return Response.send(
        res,
        UNPROCESSABLE_ENTITY,
        undefined,
        err.message,
        'ERROR'
      );
    }
  },

  async updateVariablesValidator(req, res, next) {
    const form = omit(req.body, ['user']);
    try {
      await trimInputs(form);
      await updateVariablesSchema.validateAsync(form, { abortEarly: false });

      return next();
    } catch (err) {
      return Response.send(
        res,
        UNPROCESSABLE_ENTITY,
        undefined,
        err.message,
        'ERROR'
      );
    }
  },

  async userLoginValidator(req, res, next) {
    const { body: form } = req;

    try {
      // await trimInputs(form);
      // await userLoginSchema.validateAsync(form, { abortEarly: false });

      return next();
    } catch (err) {
      return Response.send(
        res,
        UNPROCESSABLE_ENTITY,
        undefined,
        err.message,
        'ERROR'
      );
    }
  },

  async confirmAccountValidator(req, res, next) {
    const { body: form } = req;

    try {
      await trimInputs(form);
      await confirmAccountSchema.validateAsync(form, { abortEarly: false });

      return next();
    } catch (err) {
      return Response.send(
        res,
        UNPROCESSABLE_ENTITY,
        undefined,
        err.message,
        'ERROR'
      );
    }
  },

  async forgotPasswordValidator(req, res, next) {
    const { body: form } = req;

    try {
      await trimInputs(form);
      await forgotPasswordSchema.validateAsync(form, { abortEarly: false });

      return next();
    } catch (err) {
      return Response.send(
        res,
        UNPROCESSABLE_ENTITY,
        undefined,
        err.message,
        'ERROR'
      );
    }
  },

  async resetPasswordValidator(req, res, next) {
    const { body: form } = req;

    try {
      await trimInputs(form);
      await resetPasswordSchema.validateAsync(form, { abortEarly: false });

      return next();
    } catch (err) {
      return Response.send(
        res,
        UNPROCESSABLE_ENTITY,
        undefined,
        err.message,
        'ERROR'
      );
    }
  },

  async deletePageValidator(req, res, next) {
    const { params: form } = req;

    try {
      await trimInputs(form);
      await deletePageSchema.validateAsync(form, { abortEarly: false });

      return next();
    } catch (err) {
      return Response.send(
        res,
        UNPROCESSABLE_ENTITY,
        undefined,
        err.message,
        'ERROR'
      );
    }
  },

  async pageSettingsValidator(req, res, next) {
    const { returnUpdatedDocument } = req.query;
    const form = {
      ...omit(req.body, ['user']),
      returnUpdatedDocument,
    };

    try {
      await trimInputs(form);
      await pageSettingsSchema.validateAsync(form, { abortEarly: false });

      return next();
    } catch (err) {
      return Response.send(
        res,
        UNPROCESSABLE_ENTITY,
        undefined,
        err.message,
        'ERROR'
      );
    }
  },

  async fileUploadValidator(req, res, next) {
    const { body: form } = req;

    try {
      await trimInputs(form);
      await fileUploadSchema.validateAsync(form, { abortEarly: false });

      return next();
    } catch (err) {
      return Response.send(
        res,
        UNPROCESSABLE_ENTITY,
        undefined,
        err.message,
        'ERROR'
      );
    }
  },

  async subscriptionValidator(req, res, next) {
    const form = omit(req.body, ['user']);

    try {
      await trimInputs(form);
      await subscriptionSchema.validateAsync(form, { abortEarly: false });

      return next();
    } catch (err) {
      return Response.send(
        res,
        UNPROCESSABLE_ENTITY,
        undefined,
        err.message,
        'ERROR'
      );
    }
  },

  async customDomainValidator(req, res, next) {
    const { body: form } = req;

    try {
      await trimInputs(form);
      await customDomainSchema.validateAsync(form, { abortEarly: false });

      return next();
    } catch (err) {
      return Response.send(
        res,
        UNPROCESSABLE_ENTITY,
        undefined,
        err.message,
        'ERROR'
      );
    }
  },

  async workspaceValidator(req, res, next) {
    const { body: form } = req;

    try {
      await trimInputs(form);
      await workspaceSchema.validateAsync(form, { abortEarly: false });

      return next();
    } catch (err) {
      return Response.send(
        res,
        UNPROCESSABLE_ENTITY,
        undefined,
        err.message,
        'ERROR'
      );
    }
  },

  async affiliateBalanceValidator(req, res, next) {
    const { body: form } = req;

    try {
      await trimInputs(form);
      await affiliateBalanceSchema.validateAsync(form, { abortEarly: false });

      return next();
    } catch (err) {
      return Response.send(
        res,
        UNPROCESSABLE_ENTITY,
        undefined,
        err.message,
        'ERROR'
      );
    }
  },

  async changeSubscriptionValidator(req, res, next) {
    const { body: form } = req;

    try {
      await trimInputs(form);
      await changeSubscriptionSchema.validateAsync(form, { abortEarly: false });

      return next();
    } catch (err) {
      return Response.send(
        res,
        UNPROCESSABLE_ENTITY,
        undefined,
        err.message,
        'ERROR'
      );
    }
  },

  async addIntegrationValidator(req, res, next) {
    const { body: form } = req;

    try {
      await trimInputs(form);
      await addIntegrationSchema.validateAsync(form, { abortEarly: false });

      return next();
    } catch (err) {
      return Response.send(
        res,
        UNPROCESSABLE_ENTITY,
        undefined,
        err.message,
        'ERROR'
      );
    }
  },

  async addBookingIntegrationValidator(req, res, next) {
    const { body: form } = req;

    try {
      await trimInputs(form);
      await addBookingIntegrationSchema.validateAsync(form, {
        abortEarly: false,
      });

      return next();
    } catch (err) {
      return Response.send(
        res,
        UNPROCESSABLE_ENTITY,
        undefined,
        err.message,
        'ERROR'
      );
    }
  },

  async checkBookingIntegrationValidator(req, res, next) {
    const { query: form } = req;

    try {
      await trimInputs(form);
      await checkBookingIntegrationSchema.validateAsync(form, {
        abortEarly: false,
      });

      return next();
    } catch (err) {
      return Response.send(
        res,
        UNPROCESSABLE_ENTITY,
        undefined,
        err.message,
        'ERROR'
      );
    }
  },

  async createStripeCheckoutSessionValidator(req, res, next) {
    const form = omit(req.body, ['user']);

    try {
      await createStripeCheckoutSessionSchema.validateAsync(form, {
        abortEarly: false,
      });

      return next();
    } catch (err) {
      return Response.send(
        res,
        UNPROCESSABLE_ENTITY,
        undefined,
        err.message,
        'ERROR'
      );
    }
  },

  async createStripePaymentIntentValidator(req, res, next) {
    const form = omit(req.body, ['user']);

    try {
      await createStripePaymentIntentSchema.validateAsync(form, {
        abortEarly: false,
      });

      return next();
    } catch (err) {
      return Response.send(
        res,
        UNPROCESSABLE_ENTITY,
        undefined,
        err.message,
        'ERROR'
      );
    }
  },

  async subscriptionSpecialActionsValidator(req, res, next) {
    const form = omit(req.body, ['user']);

    try {
      await subscriptionSpecialActionsSchema.validateAsync(form, {
        abortEarly: false,
      });

      return next();
    } catch (err) {
      return Response.send(
        res,
        UNPROCESSABLE_ENTITY,
        undefined,
        err.message,
        'ERROR'
      );
    }
  },

  async updateCardValidator(req, res, next) {
    const { body: form } = req;

    try {
      await trimInputs(form);
      await updateCardSchema.validateAsync(form, { abortEarly: false });

      return next();
    } catch (err) {
      return Response.send(
        res,
        UNPROCESSABLE_ENTITY,
        undefined,
        err.message,
        'ERROR'
      );
    }
  },

  async getAllCategoriesValidator(req, res, next) {
    const query = pick(req.query, ['type', 'subcategory']);

    try {
      await trimInputs(query);
      await getAllCategoriesSchema.validateAsync(query, { abortEarly: false });

      return next();
    } catch (err) {
      return Response.send(
        res,
        UNPROCESSABLE_ENTITY,
        undefined,
        err.message,
        'ERROR'
      );
    }
  },

  async createListValidator(req, res, next) {
    const { body: form } = req;

    try {
      await trimInputs(form);
      await listSchema.validateAsync(form, { abortEarly: false });

      return next();
    } catch (err) {
      return Response.send(
        res,
        UNPROCESSABLE_ENTITY,
        undefined,
        err.message,
        'ERROR'
      );
    }
  },

  async addListsAndTagsValidator(req, res, next) {
    const { body: form } = req;

    try {
      await trimInputs(form);
      await addListsAndTagsSchema.validateAsync(form, { abortEarly: false });

      return next();
    } catch (err) {
      return Response.send(
        res,
        UNPROCESSABLE_ENTITY,
        undefined,
        err.message,
        'ERROR'
      );
    }
  },

  async createPageValidator(req, res, next) {
    const { body: form } = req;

    try {
      await trimInputs(form);
      await createPageSchema.validateAsync(form, { abortEarly: false });

      return next();
    } catch (err) {
      return Response.send(
        res,
        UNPROCESSABLE_ENTITY,
        undefined,
        err.message,
        'ERROR'
      );
    }
  },

  async updatePageValidator(req, res, next) {
    const { body: form } = req;

    try {
      await trimInputs(form);
      await updatePageSchema.validateAsync(form, { abortEarly: false });

      return next();
    } catch (err) {
      return Response.send(
        res,
        UNPROCESSABLE_ENTITY,
        undefined,
        err.message,
        'ERROR'
      );
    }
  },

  async newTagCategoryValidator(req, res, next) {
    const form = omit(req.body, ['user']);

    try {
      await trimInputs(form);
      await newTagCategorySchema.validateAsync(form, { abortEarly: false });

      return next();
    } catch (err) {
      return Response.send(
        res,
        UNPROCESSABLE_ENTITY,
        undefined,
        err.message,
        'ERROR'
      );
    }
  },

  async getPageValidator(req, res, next) {
    const { username, hostName } = req.query;

    try {
      await trimInputs({ username, hostName });

      /**
       * 1. hostName must be defined
       * 2. if username is missing, then hostName must not point to any of our domains
       * 3. if hostname is an external domain, username is not necessary
       */
      return !hostName || (!username && INTERNAL_DOMAINS.includes(hostName))
        ? Response.send(
          res,
          UNPROCESSABLE_ENTITY,
          undefined,
          ACTION_NOT_UNDERSTOOD,
          'ERROR'
        )
        : next();
    } catch (err) {
      return Response.send(
        res,
        UNPROCESSABLE_ENTITY,
        undefined,
        err.message,
        'ERROR'
      );
    }
  },

  async deleteSomeLeadsValidator(req, res, next) {
    const { body: form } = req;

    try {
      await trimInputs(form);
      await deleteSomeLeadsSchema.validateAsync(form, { abortEarly: false });

      return next();
    } catch (err) {
      return Response.send(
        res,
        UNPROCESSABLE_ENTITY,
        undefined,
        err.message,
        'ERROR'
      );
    }
  },

  async verifyLeadsValidator(req, res, next) {
    const { body: form } = req;

    try {
      await trimInputs(form);
      await verifyLeadsSchema.validateAsync(form, { abortEarly: false });

      return next();
    } catch (err) {
      return Response.send(
        res,
        UNPROCESSABLE_ENTITY,
        undefined,
        err.message,
        'ERROR'
      );
    }
  },

  async uploadLeadsValidator(req, res, next) {
    const { body: form } = req;

    try {
      await trimInputs(form);
      await uploadLeadsSchema.validateAsync(form, { abortEarly: false });

      return next();
    } catch (err) {
      return Response.send(
        res,
        UNPROCESSABLE_ENTITY,
        undefined,
        err.message,
        'ERROR'
      );
    }
  },

  async addOrRemoveChildrenTagsFromParentCategoryValidator(req, res, next) {
    const {
      body: form,
      query: { ops },
    } = req;

    try {
      await trimInputs(form);

      switch (ops) {
        case 'add-child': {
          await addTagsToParentCategorySchema.validateAsync(form, {
            abortEarly: false,
          });
          break;
        }

        case 'delete-child': {
          await deleteTagFromParentCategorySchema.validateAsync(form, {
            abortEarly: false,
          });
          break;
        }

        default: {
          return Response.send(
            res,
            UNPROCESSABLE_ENTITY,
            undefined,
            ACTION_NOT_UNDERSTOOD,
            'ERROR'
          );
        }
      }

      return next();
    } catch (err) {
      return Response.send(
        res,
        UNPROCESSABLE_ENTITY,
        undefined,
        err.message,
        'ERROR'
      );
    }
  },

  async savePageVisitLogsValidator(req, res, next) {
    const { body: form } = req;

    try {
      await trimInputs(form);
      await savePageVisitLogsSchema.validateAsync(form, { abortEarly: false });

      return isEmpty(form.logs)
        ? Response.send(
          res,
          UNPROCESSABLE_ENTITY,
          undefined,
          ACTION_NOT_UNDERSTOOD,
          'ERROR'
        )
        : next();
    } catch (err) {
      return Response.send(
        res,
        UNPROCESSABLE_ENTITY,
        undefined,
        err.message,
        'ERROR'
      );
    }
  },

  async createLeadValidator(req, res, next) {
    const { body: form } = req;

    try {
      await trimInputs(form);
      await createLeadSchema.validateAsync(form, { abortEarly: false });

      return next();
    } catch (err) {
      return Response.send(
        res,
        UNPROCESSABLE_ENTITY,
        undefined,
        err.message,
        'ERROR'
      );
    }
  },

  async editLeadValidator(req, res, next) {
    const { body: form } = req;

    try {
      await trimInputs(form);
      await editLeadSchema.validateAsync(form, { abortEarly: false });

      return next();
    } catch (err) {
      return Response.send(
        res,
        UNPROCESSABLE_ENTITY,
        undefined,
        err.message,
        'ERROR'
      );
    }
  },

  async addVariableValidator(req, res, next) {
    const form = omit(req.body, ['user']);
    try {
      await trimInputs(form);
      await addVariableSchema.validateAsync(form, { abortEarly: false });

      return next();
    } catch (err) {
      return Response.send(
        res,
        UNPROCESSABLE_ENTITY,
        undefined,
        err.message,
        'ERROR'
      );
    }
  },

  async editLeadBySelfValidator(req, res, next) {
    const { body: form } = req;

    try {
      await trimInputs(form);
      await editLeadBySelfSchema.validateAsync(form, { abortEarly: false });

      return next();
    } catch (err) {
      return Response.send(
        res,
        UNPROCESSABLE_ENTITY,
        undefined,
        err.message,
        'ERROR'
      );
    }
  },

  async addNoteValidator(req, res, next) {
    const { body: form } = req;

    if (isEmpty(form.note)) {
      return Response.send(
        res,
        UNPROCESSABLE_ENTITY,
        undefined,
        ACTION_NOT_UNDERSTOOD,
        'ERROR'
      );
    }

    try {
      await trimInputs(form);
      await addNoteSchema.validateAsync(form, { abortEarly: false });

      return next();
    } catch (err) {
      return Response.send(
        res,
        UNPROCESSABLE_ENTITY,
        undefined,
        err.message,
        'ERROR'
      );
    }
  },

  async getPageAnalyticsReportValidator(req, res, next) {
    const { body: form } = req;

    if (isEmpty(req.body.dateRange)) {
      return Response.send(
        res,
        UNPROCESSABLE_ENTITY,
        undefined,
        ACTION_NOT_UNDERSTOOD,
        'ERROR'
      );
    }

    try {
      await trimInputs(form);
      await getPageAnalyticsReportSchema.validateAsync(form, {
        abortEarly: false,
      });

      return next();
    } catch (err) {
      return Response.send(
        res,
        UNPROCESSABLE_ENTITY,
        undefined,
        err.message,
        'ERROR'
      );
    }
  },

  async createEmailValidator(req, res, next) {
    const form = omit(req.body, ['user']);
    try {
      await trimInputs(form);
      await createEmailSchema.validateAsync(form, { abortEarly: false });

      return next();
    } catch (err) {
      return Response.send(
        res,
        UNPROCESSABLE_ENTITY,
        undefined,
        err.message,
        'ERROR'
      );
    }
  },

  async editEmailValidator(req, res, next) {
    const { body } = req;

    try {
      await trimInputs(body);
      await editEmailSchema.validateAsync(body, { abortEarly: false });

      return next();
    } catch (err) {
      return Response.send(
        res,
        UNPROCESSABLE_ENTITY,
        undefined,
        err.message,
        'ERROR'
      );
    }
  },

  async sendEmailValidator(req, res, next) {
    const { body } = req;

    try {
      await trimInputs(body);
      await sendEmailSchema.validateAsync(body, { abortEarly: false });

      return next();
    } catch (err) {
      return Response.send(
        res,
        UNPROCESSABLE_ENTITY,
        undefined,
        err.message,
        'ERROR'
      );
    }
  },

  async emailSubscriptionStatusValidator(req, res, next) {
    const { body } = req;

    try {
      await trimInputs(body);
      await emailSubscriptionStatusSchema.validateAsync(body, {
        abortEarly: false,
      });

      return next();
    } catch (err) {
      return Response.send(
        res,
        UNPROCESSABLE_ENTITY,
        undefined,
        err.message,
        'ERROR'
      );
    }
  },

  async getTemplatesValidator(req, res, next) {
    const { type, category } = req.query;

    try {
      await trimInputs({ type, category });
      await getTemplatesSchema.validateAsync(
        { type, category },
        { abortEarly: false }
      );

      return next();
    } catch (err) {
      return Response.send(
        res,
        UNPROCESSABLE_ENTITY,
        undefined,
        err.message,
        'ERROR'
      );
    }
  },

  async assignHomePageValidator(req, res, next) {
    const {
      params: { id: domainId },
      body: { pageId },
    } = req;

    try {
      await trimInputs({ domainId, pageId });
      await assignHomePageSchema.validateAsync(
        { domainId, pageId },
        { abortEarly: false }
      );

      return next();
    } catch (err) {
      return Response.send(
        res,
        UNPROCESSABLE_ENTITY,
        undefined,
        err.message,
        'ERROR'
      );
    }
  },

  async unAssignHomePageValidator(req, res, next) {
    const {
      params: { id: domainId },
    } = req;

    try {
      await trimInputs({ domainId });
      await unAssignHomePageSchema.validateAsync(
        { domainId },
        { abortEarly: false }
      );

      return next();
    } catch (err) {
      return Response.send(
        res,
        UNPROCESSABLE_ENTITY,
        undefined,
        err.message,
        'ERROR'
      );
    }
  },

  async paginationValidator(req, res, next) {
    const form = pick(req.query, [
      'include_blacklist',
      'page',
      'pageToken',
      'limit',
      'liteMode',
    ]);

    try {
      await trimInputs(form);
      await paginationSchema.validateAsync(form, { abortEarly: false });

      return next();
    } catch (err) {
      return Response.send(
        res,
        UNPROCESSABLE_ENTITY,
        undefined,
        err.message,
        'ERROR'
      );
    }
  },

  async bookingScheduleValidator(req, res, next) {
    const form = req.body;
    const { bookingId } = req.params;
    const { username } = req.query;

    form.id = bookingId;
    form.username = username;

    try {
      await trimInputs(form);
      await bookingScheduleSchema.validateAsync(form, { abortEarly: false });

      return next();
    } catch (err) {
      return Response.send(
        res,
        UNPROCESSABLE_ENTITY,
        undefined,
        err.message,
        'ERROR'
      );
    }
  },

  async createShopValidator(req, res, next) {
    const form = omit(req.body, ['user']);

    try {
      await trimInputs(form);
      await createShopSchema.validateAsync(form, { abortEarly: false });

      return next();
    } catch (err) {
      return Response.send(
        res,
        UNPROCESSABLE_ENTITY,
        undefined,
        err.message,
        'ERROR'
      );
    }
  },

  async getOneShopValidator(req, res, next) {
    try {
      await trimInputs(req.body);
      await getOneShopSchema.validateAsync(req.body, { abortEarly: false });

      return next();
    } catch (err) {
      return Response.send(
        res,
        UNPROCESSABLE_ENTITY,
        undefined,
        err.message,
        'ERROR'
      );
    }
  },

  async deleteShopValidator(req, res, next) {
    const { shopId } = req.params;

    try {
      await trimInputs({ shopId });
      await deleteShopSchema.validateAsync({ shopId }, { abortEarly: false });

      return next();
    } catch (err) {
      return Response.send(
        res,
        UNPROCESSABLE_ENTITY,
        undefined,
        err.message,
        'ERROR'
      );
    }
  },

  async editShopValidator(req, res, next) {
    const form = omit(req.body, ['user']);

    try {
      await trimInputs(form);
      await editShopSchema.validateAsync(form, { abortEarly: false });

      return next();
    } catch (err) {
      return Response.send(
        res,
        UNPROCESSABLE_ENTITY,
        undefined,
        err.message,
        'ERROR'
      );
    }
  },

  async fxRatesValidator(req, res, next) {
    const form = omit(req.body, ['user']);

    try {
      await trimInputs(form);
      await fxRatesSchema.validateAsync(form, { abortEarly: false });
      console.log('passed fxrates validator-------------->')
      return next();
    } catch (err) {
      return Response.send(
        res,
        UNPROCESSABLE_ENTITY,
        undefined,
        err.message,
        'ERROR'
      );
    }
  },

  async addProductValidator(req, res, next) {
    const form = omit(req.body, ['user']);
    try {
      await trimInputs(form);
      await addProductSchema.validateAsync(form, { abortEarly: false });

      return next();
    } catch (err) {
      return Response.send(res, UNPROCESSABLE_ENTITY, undefined, err.message, 'ERROR');
    }
  },

  async getOneProductValidator(req, res, next) {
    try {
      await trimInputs(req.body);
      await getOneProductSchema.validateAsync(req.body, { abortEarly: false });

      return next();
    } catch (err) {
      return Response.send(
        res,
        UNPROCESSABLE_ENTITY,
        undefined,
        err.message,
        'ERROR'
      );
    }
  },

  async getBatchProductsValidator(req, res, next) {
    try {
      await trimInputs(req.body);
      await getBatchProductsSchema.validateAsync(req.body, {
        abortEarly: false,
      });

      return next();
    } catch (err) {
      return Response.send(
        res,
        UNPROCESSABLE_ENTITY,
        undefined,
        err.message,
        'ERROR'
      );
    }
  },

  async getAllProductsValidator(req, res, next) {
    const form = pick(req.query, ['username', 'domain']);

    try {
      await trimInputs(form);
      await getAllProductsSchema.validateAsync(form, { abortEarly: false });

      return next();
    } catch (err) {
      return Response.send(
        res,
        UNPROCESSABLE_ENTITY,
        undefined,
        err.message,
        'ERROR'
      );
    }
  },

  async productQueryValidator(req, res, next) {
    const queries = pick(req.query, ['category', 'subcategory', 'shopId']);

    try {
      await trimInputs(queries);
      await productQuerySchema.validateAsync(queries, { abortEarly: false });

      return next();
    } catch (err) {
      return Response.send(
        res,
        UNPROCESSABLE_ENTITY,
        undefined,
        err.message,
        'ERROR'
      );
    }
  },

  async editProductValidator(req, res, next) {
    const form = omit(req.body, ['user']);

    try {
      await trimInputs(form);
      await editProductSchema.validateAsync(form, { abortEarly: false });

      return next();
    } catch (err) {
      return Response.send(
        res,
        UNPROCESSABLE_ENTITY,
        undefined,
        err.message,
        'ERROR'
      );
    }
  },

  async deleteProductValidator(req, res, next) {
    const { productId } = req.params;

    try {
      await trimInputs({ productId });
      await deleteProductSchema.validateAsync(
        { productId },
        { abortEarly: false }
      );

      return next();
    } catch (err) {
      return Response.send(
        res,
        UNPROCESSABLE_ENTITY,
        undefined,
        err.message,
        'ERROR'
      );
    }
  },

  async createOCPValidator(req, res, next) {
    const form = omit(req.body, ['user']);
    // const form = req.body;

    try {
      await trimInputs(form);
      await createOCPSchema.validateAsync(form, { abortEarly: false });

      return next();
    } catch (err) {
      return Response.send(
        res,
        UNPROCESSABLE_ENTITY,
        undefined,
        err.message,
        'ERROR'
      );
    }
  },

  async getOneOCP(req, res, next) {
    try {
      await trimInputs(req.body);
      await getOneOCP.validateAsync(req.body, { abortEarly: false });

      return next();
    } catch (err) {
      return Response.send(
        res,
        UNPROCESSABLE_ENTITY,
        undefined,
        err.message,
        'ERROR'
      );
    }
  },

  async createOrderValidator(req, res, next) {
    try {
      await trimInputs(req.body);
      await createOrderSchema.validateAsync(req.body, { abortEarly: false });

      return next();
    } catch (err) {
      return Response.send(
        res,
        UNPROCESSABLE_ENTITY,
        undefined,
        err.message,
        'ERROR'
      );
    }
  },

  async modifyOrderStatusValidator(req, res, next) {
    const form = {
      orderId: req.params.orderId,
      status: req.body.status,
      returnUpdated: req.query.returnUpdated,
    };

    try {
      await trimInputs(form);
      await modifyOrderStatusSchema.validateAsync(form, { abortEarly: false });

      return next();
    } catch (err) {
      return Response.send(
        res,
        UNPROCESSABLE_ENTITY,
        undefined,
        err.message,
        'ERROR'
      );
    }
  },

  async addSlugValidator(req, res, next) {
    const form = omit(req.body, ['user']);

    try {
      await trimInputs(form);
      await addSlugSchema.validateAsync(form, { abortEarly: false });

      return next();
    } catch (err) {
      return Response.send(
        res,
        UNPROCESSABLE_ENTITY,
        undefined,
        err.message,
        'ERROR'
      );
    }
  },

  async addSectionValidator(req, res, next) {
    const form = omit(req.body, ['user']);

    try {
      await trimInputs(form);
      await addSectionSchema.validateAsync(form, { abortEarly: false });

      return next();
    } catch (err) {
      return Response.send(
        res,
        UNPROCESSABLE_ENTITY,
        undefined,
        err.message,
        'ERROR'
      );
    }
  },

  async addOrRemoveSubsectionValidator(req, res, next) {
    const form = omit(req.body, ['user']);

    try {
      console.log('I REACHED THE VALIDATOR----->');
      await trimInputs(form);
      await addOrRemoveSubsectionSchema.validateAsync(form, {
        abortEarly: false,
      });

      return next();
    } catch (err) {
      return Response.send(
        res,
        UNPROCESSABLE_ENTITY,
        undefined,
        err.message,
        'ERROR'
      );
    }
  },

  async editDeliveryFeesValidator(req, res, next) {
    const form = omit(req.body, ['user']);

    try {
      await trimInputs(form);
      await editDeliveryFeesSchema.validateAsync(form, { abortEarly: false });

      return next();
    } catch (err) {
      return Response.send(
        res,
        UNPROCESSABLE_ENTITY,
        undefined,
        err.message,
        'ERROR'
      );
    }
  },

  async addPickupAddressValidator(req, res, next) {
    const form = omit(req.body, ['user']);

    try {
      await trimInputs(form);
      await addPickupAddressSchema.validateAsync(form, {
        abortEarly: false,
      });

      return next();
    } catch (err) {
      return Response.send(
        res,
        UNPROCESSABLE_ENTITY,
        undefined,
        err.message,
        'ERROR'
      );
    }
  },

  async editPickupAddressValidator(req, res, next) {
    const form = omit(req.body, ['user']);

    try {
      await trimInputs(form);
      await editPickupAddressSchema.validateAsync(form, {
        abortEarly: false,
      });

      return next();
    } catch (err) {
      return Response.send(
        res,
        UNPROCESSABLE_ENTITY,
        undefined,
        err.message,
        'ERROR'
      );
    }
  },

  async getOneWalletValidator(req, res, next) {
    try {
      await getOneWalletSchema.validateAsync(req.params, {
        abortEarly: false,
      });

      return next();
    } catch (err) {
      return Response.send(
        res,
        UNPROCESSABLE_ENTITY,
        undefined,
        err.message,
        'ERROR'
      );
    }
  },

  async getActiveSubscriptionValidator(req, res, next) {
    try {
      await getActiveSubscriptionSchema.validateAsync(req.query, {
        abortEarly: false,
      });
      
      console.log("exiting validator 1....")
      return next();
    } catch (err) {
      return Response.send(
        res,
        UNPROCESSABLE_ENTITY,
        undefined,
        err.message,
        'ERROR'
      );
    }
  },

  async cronListenerValidator(req, res, next) {
    try {
      await cronListenerSchema.validateAsync(req.body, {
        abortEarly: false,
      });

      return next();
    } catch (err) {
      return Response.send(
        res,
        UNPROCESSABLE_ENTITY,
        undefined,
        err.message,
        'ERROR'
      );
    }
  },
};
