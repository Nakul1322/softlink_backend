import Joi from '@hapi/joi';

export default Joi.object({
  id: Joi.string(),

  name: Joi.string().required(),

  countNumber: Joi.number().required(),

  timePeriod: Joi.number().required(),

  rollOver: Joi.boolean().required(),

});
