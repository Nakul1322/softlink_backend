import Joi from "@hapi/joi";
import { GUARDS } from "../../../helpers/constants";

export default Joi.object({
  action: Joi.string()
    .valid(...Object.keys(GUARDS.SUBSCRIPTION_ACTIONS))
    .required(),
});
