import Joi from '@hapi/joi';
import { GUARDS } from '../../helpers/constants';

const choices = ['yes', 'no'];

export default Joi.object({
  // --- for leads only --- //
  include_blacklist: Joi.string()
    .valid(...choices),

  liteMode: Joi.string()
    .valid(...choices),
  // --------------------- //

  page: Joi.number().min(1), 
  pageToken: Joi.string(),

  limit: Joi.number().required()
    .valid(...GUARDS.PAGINATION_LIMIT)
});
