import Joi from '@hapi/joi';
import { ALLOWED_EMAIL_VARIABLES } from '../../../helpers/constants';

export default Joi.object({
  broadcastId: Joi.string().required(),

  recipients: Joi.array()
    .required(),

  standalone: Joi.boolean()
    .required(),

  variables: Joi.array()
    .items(
      Joi.string()
        .valid(...ALLOWED_EMAIL_VARIABLES)
        .required()
    ),

  user: Joi.object(),

  schedule: Joi.object({
    config: Joi.object(),
    fixed: Joi.boolean(),
  })

});
