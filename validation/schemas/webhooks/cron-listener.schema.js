import Joi from '@hapi/joi';
import { WEBHOOKS } from '../../../helpers/constants';

export default Joi.object({
  ready: Joi.boolean().valid(true).required(),

  message: Joi.string()
    .valid(...Object.values(WEBHOOKS.CRON_SERVER_ACTIONS))
    .required(),

  from: Joi.string(),

  to: Joi.string()
});
