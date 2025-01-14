import Joi from "@hapi/joi";
import { GUARDS } from "../../../helpers/constants";

export default Joi.object({
  subscriptionId: Joi.string().required(),

  action: Joi.string()
    .valid(
      ...[
        GUARDS.SUBSCRIPTION_ACTIONS.freeze,
        GUARDS.SUBSCRIPTION_ACTIONS.unfreeze,
      ]
    )
    .required(),
});
