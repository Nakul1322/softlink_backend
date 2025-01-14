import Joi from '@hapi/joi';
import { FILTER_CATEGORIES } from '../../../helpers/constants';

export default Joi.object({
  fromName: Joi.string()
    .required(),

  fromEmail: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: {
        allow: true
      }
    })
    .required(),

  replyTo: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: {
        allow: true
      }
    })
    .required(),

  subject: Joi.string()
    .required(),

  body: Joi.string()
    .required(),

  previewText: Joi.string(),

  contentType: Joi.string()
    .valid('text', 'html')
    .required(), 

  category: Joi.string()
    .valid(...FILTER_CATEGORIES.EMAILS.flat()),

  type: Joi.string()
    .valid('followUp', 'broadcast')
    .required(),
});
