import Joi from "@hapi/joi";
import { SHOP } from "../../../helpers/constants";

export default Joi.object({
  name: Joi.string().required(),
  location: Joi.string().required(),
  price: Joi.number().min(0).required(),
  currency: Joi.string()
    .valid(...SHOP.currencyList)
    .required(),
});
