import Joi from '@hapi/joi';

export default Joi.object({

  id: Joi.string().required(),

  username: Joi.string().required(),

  event: Joi.string().required(),
  // --------------------- //

  invitee: Joi.string().required(),
});
