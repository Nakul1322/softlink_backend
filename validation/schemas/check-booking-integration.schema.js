import Joi from '@hapi/joi';

export default Joi.object({
  username: Joi.string()
    .required(),
});
