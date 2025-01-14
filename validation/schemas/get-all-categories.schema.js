import Joi from '@hapi/joi';
import { FILTER_CATEGORIES } from '../../helpers/constants';

const filter = [...Object.keys(FILTER_CATEGORIES.PAGES), 'All'];

export default Joi.object({
  type: Joi.string()
    .valid('page', 'email')
    .required(),

  subcategory: Joi.string()
    .valid(...filter.flat())
    .when('type', { is: 'page', then: Joi.required() })
});
