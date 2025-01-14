import Joi from "@hapi/joi";
import { SHOP } from "../../../helpers/constants";

export default Joi.object({
  currency: Joi.string()
    .valid(...SHOP.currencyList)
    .required(),
});
