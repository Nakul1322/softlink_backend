import Joi from '@hapi/joi';

export default Joi.object({
  pageTitle: Joi.string()
    .required(),
});
