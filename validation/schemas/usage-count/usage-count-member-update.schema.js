import Joi from '@hapi/joi';

export default Joi.object({
  deductAmount: Joi.number().required(),
});
