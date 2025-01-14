import Joi from '@hapi/joi';

export default Joi.object({
  username: Joi.string().required(),

  membershipId: Joi.string().required(),

  postId: Joi.string().required(),

  member: Joi.string().required(),

  text: Joi.string().required(),

  commentId: Joi.string().required()
});
