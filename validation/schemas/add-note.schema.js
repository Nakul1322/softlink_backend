import Joi from '@hapi/joi';

export default Joi.object({
  leadId: Joi.string()
    .required(),

  note: Joi.array()
    .items(Joi.object({
      poster: Joi.string().required(),
      comment: Joi.string().required(),
    }))
    .required(),

  user: Joi.object()
});
