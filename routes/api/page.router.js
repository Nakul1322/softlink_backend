import { Router } from 'express';
import PageController from '../../controllers/pageController';
import Authenticator from '../../middlewares/auth.middleware';
import Guards from '../../middlewares/guards.middleware';
import { ROUTES } from '../../helpers/constants';
import Validators from '../../validation/index.validation';

const router = Router();

const { isLoggedIn } = Authenticator;
const { pagesLimitGuard } = Guards;

const {
  createPageValidator,
  pageSettingsValidator,
  getAllCategoriesValidator,
  updatePageValidator,
  getPageValidator,
  savePageVisitLogsValidator,
  getPageAnalyticsReportValidator,
  paginationValidator,
} = Validators;

const {
  PAGES: {
    createPage,
    updatePage,
    deletePage,
    getPage,
    getAllPages,
    pageSettings,
    getPageAnalyticsReport,
  },
  PAGE_VISIT_LOGS: {
    savePageVisitLogs,
  },
  CATEGORIES: { getAllCategories }
} = ROUTES;

router.post(
  createPage,
  isLoggedIn,
  createPageValidator,
  pagesLimitGuard,
  PageController.createPage,
);

router.get(
  getPage,
  getPageValidator,
  PageController.getPage,
);

router.get(
  getAllPages,
  isLoggedIn,
  paginationValidator,
  PageController.getAllPages
);

router.delete(
  deletePage,
  isLoggedIn,
  // deletePageValidator,
  PageController.deletePage
);

router.patch(
  updatePage,
  isLoggedIn,
  updatePageValidator,
  PageController.updatePage,
);

router.patch(
  pageSettings,
  isLoggedIn,
  pageSettingsValidator,
  PageController.addPageSettings,
);

router.get(
  getAllCategories,
  isLoggedIn,
  getAllCategoriesValidator,
  PageController.getAllCategories,
);

router.post(
  savePageVisitLogs,
  savePageVisitLogsValidator,
  PageController.savePageVisitLogs,
);

router.post(
  getPageAnalyticsReport,
  isLoggedIn,
  getPageAnalyticsReportValidator,
  PageController.getPageAnalyticsReport,
);

export default router;
