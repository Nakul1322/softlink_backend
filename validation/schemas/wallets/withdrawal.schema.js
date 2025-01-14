import Joi from '@hapi/joi';
import { SHOP } from '../../../helpers/constants';

export default Joi.object({
  accountNumber: Joi.string().min(10).max(15).required(),

  bankCode: Joi.string().required(),

  description: Joi.string().required(),

  from: Joi.object({
    currency: Joi.string().valid(...SHOP.currencyList).required(),
    amount: Joi.number().precision(2).min(500).required(),
  }).required(),

  to: Joi.object({
    currency: Joi.string().valid(...SHOP.currencyList).required(),
    amount: Joi.number().precision(2).min(500).required(),
  }).required(),

  destinationCode: Joi.string(),

  beneficiaryName: Joi.string(),
});
