import { Router } from 'express';
import Authenticator from '../../middlewares/auth.middleware';
import CommentController from '../../controllers/commentController';
import Validators from '../../validation/index.validation';
import { ROUTES } from '../../helpers/constants';

const router = Router();

const {
  COMMENT: {
    enablePostComment,
    createMembershipPostComment,
    getMembershipPostCommentById,
    getMembershipPostCommentByMembershipId,
    getMembershipPostCommentByPostId,
    getMembershipPostCommentByMemberId,
    getInactiveMembershipPostComment,
    createMembershipPostCommentReply,
    editMembershipPostCommentReply,
    deleteMembershipPostCommentReply,
  }
} = ROUTES;

const { isLoggedIn } = Authenticator;

const { createMembershipPostCommentSchemaValidator, createMembershipPostCommentReplySchemaValidator } = Validators;

router.post(
  enablePostComment,
  isLoggedIn,
  CommentController.enablePostComment
);

router.post(
  createMembershipPostComment,
  createMembershipPostCommentSchemaValidator,
  CommentController.createMembershipPostComment
);

router.get(
  getMembershipPostCommentById,
  CommentController.getMembershipPostCommentById
);

router.get(
  getMembershipPostCommentByMembershipId,
  CommentController.getMembershipPostCommentByMembershipId
);

router.get(
  getMembershipPostCommentByPostId,
  CommentController.getMembershipPostCommentByPostId
);

router.get(
  getMembershipPostCommentByMemberId,
  CommentController.getMembershipPostCommentByMemberId
);

router.get(
  getInactiveMembershipPostComment,
  isLoggedIn,
  CommentController.getInactiveMembershipPostComment
);

router.post(
  createMembershipPostCommentReply,
  createMembershipPostCommentReplySchemaValidator,
  CommentController.createMembershipPostCommentReply
);

router.put(
  editMembershipPostCommentReply,
  CommentController.editMembershipPostCommentReply
);

router.post(
  deleteMembershipPostCommentReply,
  isLoggedIn,
  CommentController.deleteMembershipPostCommentReply
);

export default router;
