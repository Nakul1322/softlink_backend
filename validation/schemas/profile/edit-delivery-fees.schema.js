import Joi from "@hapi/joi";
import { SHOP } from "../../../helpers/constants";

export default Joi.object({
  ops: Joi.string().valid("add-child", "delete-child").required(),

  deliveryFees: Joi.array()
    .items(
      Joi.object({
        location: Joi.string().required(),
        price: Joi.number().min(0).required(),
        currency: Joi.string()
          .valid(...SHOP.currencyList)
          .required(),
      }).required()
    )
    .required(),
});
