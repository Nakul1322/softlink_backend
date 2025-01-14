import Joi from '@hapi/joi';

export default Joi.object({
  name: Joi.string(),

  id: Joi.string(),

  username: Joi.string(),

  baseUrl: Joi.string(),

  logoUrl: Joi.string(),

  customDomain: Joi.string().allow(''),

  description: Joi.string(),

  salesPromotion: Joi.string(),

  imageUrl: Joi.string().allow(''),

  secured: Joi.boolean(),

  welcomeEmail: Joi.string(),

  helpdesk: Joi.object({}).allow(null),

  content: Joi.object({
    // To define content schema
    content: Joi.string(),
    metadata: Joi.any(),
    posts: Joi.array().items(Joi.any()),
  }).allow(null, {}),

  progressBar: Joi.object({
    type: Joi.string(),
    badge: Joi.object().allow(null),
  }).allow(null),

  comments: Joi.object({
    autosave: Joi.boolean(),
    comments: Joi.boolean(),
    selection: Joi.string(),
    posts: Joi.array().items(Joi.string()),
  }).allow(null, Joi.object()),

  lists: Joi.array().items(Joi.string()),

  tags: Joi.array().items(Joi.string()),

  accesses: Joi.array().items(
    Joi.object({
      // Define access schema
      id: Joi.string(),
      randomInterval: Joi.number().allow(null),
      randomPostsAmount: Joi.number().allow(null),
      posts: Joi.array().items(Joi.object({
        postId: Joi.string(),
        startedIn: Joi.number().allow(null)
      })),
    })
  ),

  isSetupFinished: Joi.boolean(),

  published: Joi.boolean(),

  lockedPost: Joi.object({
    pattern: Joi.string(),
    modalContent: Joi.string(),
  }),

});
