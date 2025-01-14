import Joi from '@hapi/joi';

export default Joi.object({
  dateRange: Joi.object()
    .required(),

  useR: Joi.object({
    type: Joi.string().required(),
    userId: Joi.string().required(),
  })
    .required(),

  viewId: Joi.string()
    .required(),

  user: Joi.object()
});
