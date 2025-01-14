import Joi from "@hapi/joi";
import { SHOP } from "../../../helpers/constants";

export default Joi.object({
  name: Joi.string(),
  location: Joi.string(),
  price: Joi.number().min(0),
  currency: Joi.string().valid(...SHOP.currencyList),
});
