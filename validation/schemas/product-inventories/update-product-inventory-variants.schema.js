import Joi from '@hapi/joi';

export default Joi.object({

  variants: Joi.array().items(Joi.object()),

});
