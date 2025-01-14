import { Router } from 'express';
import TransactionController from '../../controllers/transactionController';
import Authenticator from '../../middlewares/auth.middleware';
import { ROUTES } from '../../helpers/constants';
import Validators from '../../validation/index.validation';

const router = Router();
const { transactions, transactionBalance, transactionsCount } = ROUTES;
const { isLoggedIn } = Authenticator;
const { paginationValidator } = Validators;

router.get(
  transactions,
  isLoggedIn,
  paginationValidator,
  TransactionController.getUserTransactions
);

router.get(
  transactionBalance,
  isLoggedIn,
  TransactionController.transactionBalance
);

router.get(
  transactionsCount,
  isLoggedIn,
  TransactionController.getUserTransactionsCount
);

export default router;
