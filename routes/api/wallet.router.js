import { Router } from 'express';
import WalletController from '../../controllers/walletController';
import Authenticator from '../../middlewares/auth.middleware';
import Validator from '../../validation/index.validation';
import WalletMiddleware from '../../middlewares/wallet.middleware';
import { ROUTES } from '../../helpers/constants';

const router = Router();

const { withdrawalValidator, fxRatesValidator, getOneWalletValidator } = Validator;

const { isLoggedIn } = Authenticator;

const { validateWallet, validateBeneficiary } = WalletMiddleware;

const {
  WALLET: {
    getAllWallets, getOneWallet, makeWithdrawal, fxRates, getBankBranches
  },
} = ROUTES;

router.get(getAllWallets, isLoggedIn, WalletController.getUserWallet);

router.get(
  getOneWallet,
  isLoggedIn,
  getOneWalletValidator,
  WalletController.getOneWallet
);

router.get(getBankBranches, WalletController.getBankBranches);

router.post(
  makeWithdrawal,
  isLoggedIn,
  withdrawalValidator,
  validateWallet,
  validateBeneficiary,
  WalletController.makeWithdrawal
);

router.post(fxRates, isLoggedIn, fxRatesValidator, WalletController.fxRates);

export default router;
