import Joi from '@hapi/joi';

export default Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: {
        allow: true
      }
    })
    .required(),

  username: Joi.any()
    .required(),

  hostName: Joi.string()
    .required(),

  logs: Joi.array()
    .items(Joi.object({
      action: Joi.string().valid('PAGE_ARRIVAL', 'PAGE_DEPARTURE', 'BUTTON_CLICK', 'ABANDONED_CART').required(),
      button: Joi.string(),
      pageTitle: Joi.string().required(),
      timeStamp: Joi.string().required(),
    }))
    .required(),
});
