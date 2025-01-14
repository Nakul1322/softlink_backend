import { Router } from "express";

import FileController from "../../controllers/fileController";
import Authenticator from "../../middlewares/auth.middleware";
import { ROUTES } from "../../helpers/constants";
import Validators from "../../validation/index.validation";

const router = Router();

const { isLoggedIn } = Authenticator;

const { uploadFile, getFile, getAllFiles, deleteFile } = ROUTES.FILES;

const { fileUploadValidator, paginationValidator } = Validators;

router.post(
  uploadFile,
  isLoggedIn,
  fileUploadValidator,
  FileController.uploadFile
);

router.get(getFile, isLoggedIn, FileController.getFile);

router.get(
  getAllFiles,
  isLoggedIn,
  paginationValidator,
  FileController.getAllFiles
);

router.delete(deleteFile, isLoggedIn, FileController.deleteFile);

export default router;
