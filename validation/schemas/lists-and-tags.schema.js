import Joi from '@hapi/joi';

export default Joi.object({
  listGroups: Joi.string(),
  tagCategories: Joi.string(),

  // allow token object pass
  user: Joi.object()
});
