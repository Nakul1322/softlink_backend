import Joi from '@hapi/joi';

export default Joi.object({
  destinationWallet: Joi.string().valid('dma').required(),

  txref: Joi.string().required(),

  amount: Joi.string().required(),

  gateway: Joi.string().required(),

  // allow token object pass
  user: Joi.object()
});
