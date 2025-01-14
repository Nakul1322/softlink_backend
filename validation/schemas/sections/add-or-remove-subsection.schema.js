import Joi from '@hapi/joi';

export default Joi.object({
  ops: Joi.string()
    .valid('add-child', 'delete-child')
    .required(),

  subsections: Joi.array().items(
    Joi.string().required(),
  ).required(),
});
