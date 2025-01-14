import Joi from '@hapi/joi';
import { SHOP } from '../../../helpers/constants';

const {
  product: {
    categories,
    subCategories,
  }
} = SHOP;

export default Joi.object({
  category: Joi.string()
    .valid(...categories),

  subcategory: Joi.string()
    .valid(...subCategories),

  shopId: Joi.string()
    .alphanum()
});
