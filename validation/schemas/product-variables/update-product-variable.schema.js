import Joi from '@hapi/joi';

export default Joi.object({
  _id: Joi.string(),

  name: Joi.string().required(),

  options: Joi.array()
    .items(Joi.string())
    .required()

});