import Joi from '@hapi/joi';

export default Joi.object({
  idArray: Joi.array()
    .items(Joi.string().required())
    .required(),

  user: Joi.object()
});
