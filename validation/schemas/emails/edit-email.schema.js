import Joi from '@hapi/joi';
import { FILTER_CATEGORIES } from '../../../helpers/constants';

export default Joi.object({
  fromName: Joi.string(),

  fromEmail: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: {
        allow: true
      }
    }),

  replyTo: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: {
        allow: true
      }
    }),

  subject: Joi.string(),

  body: Joi.string(),

  previewText: Joi.string(),

  contentType: Joi.string()
    .valid('text', 'html'),

  category: Joi.string()
    .valid(...FILTER_CATEGORIES.EMAILS.flat()),

  user: Joi.object()
});
