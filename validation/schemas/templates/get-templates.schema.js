import Joi from '@hapi/joi';
import { FILTER_CATEGORIES } from '../../../helpers/constants';

export default Joi.object({
  type: Joi.string()
    .valid('page', 'email')
    .required(),

  category: Joi.string()
    .valid(...FILTER_CATEGORIES.EMAILS.flat())
});
