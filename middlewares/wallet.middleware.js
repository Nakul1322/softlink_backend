/* eslint-disable indent */
/* eslint-disable object-curly-newline */
import StatusCodes from 'http-status-codes';
import Response from '../helpers/responseHelper';
import { GATEWAYS, MESSAGE } from '../helpers/constants';
import Logger from '../logs/winston';
import Models from '../models';
import PaymentLogicController from '../controllers/paymentLogicController';
import { ObjectId } from 'mongoose';

const { Wallet, Beneficiary } = Models;

const {
  FORBIDDEN,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  UNPROCESSABLE_ENTITY,
} = StatusCodes;

const {
  SERVER_ERROR,
  RESOURCE_NOT_FOUND,
  LIMITED_WALLET,
  INSUFFICIENT_FUNDS,
  UNPROCESSABLE_REQUEST,
} = MESSAGE;

export default {
  /**
   * Validate user wallet
   * @param {Object} req
   * @param {Object} res
   * @param {*} next
   * @returns {Object} pass on the request body or an error
   */
  validateWallet: async (req, res, next) => {
    const {
      // currency,
      // withdrawalAmount,
      from,
      fee,
      user: { username },
    } = req.body;

    try {
      console.log('Awaiting validateWallet...')
      const wallet = await Wallet.findOne({ username, currency: from.currency });

      if (!wallet) return Response.send(res, NOT_FOUND, undefined, RESOURCE_NOT_FOUND, 'ERROR');

      if (wallet.isLimited || wallet.isDormant) {
        Logger.error(`Limited account '${username}' initiated withdrawal of ${wallet.currency} ${from.amount} on ${new Date().toString()}`);
        return Response.send(res, FORBIDDEN, undefined, LIMITED_WALLET, 'ERROR');
      }

      if (Number(wallet.availableBalance) < Number(from.amount) + Number(fee)) {
        Logger.error(`Account '${username}' withdrawal of ${wallet.currency} ${from.amount} on ${new Date().toString()}: insufficient funds.`);
        return Response.send(res, UNPROCESSABLE_ENTITY, undefined, INSUFFICIENT_FUNDS, 'ERROR');
      }

      console.log('wallet validation done');
      console.log('validateWallet passed!');
      return next();
    } catch (err) {
      Logger.error(err.message);
      return Response.send(res, INTERNAL_SERVER_ERROR, undefined, SERVER_ERROR, 'ERROR');
    }
  },

  /**
   * Validate beneficiary
   * @param {Object} req
   * @param {Object} res
   * @param {*} next
   * @returns {Object} pass on the request body or an error
   */
  validateBeneficiary: async (req, res, next) => {
    const { accountNumber, bankCode, user: { _id, username }, to, beneficiaryName: bn = null } = req.body;
    try {
      console.log('awaiting validateBeneficiary...')
      // req.body.beneficiary = await Beneficiary.findOne({ userId: _id, accountNumber, bankCode }, { fullName: 1 });
      // console.log(_id.toString(), typeof(_id.toString()), '\n\n', accountNumber, typeof accountNumber, '\n\n', bankCode, typeof bankCode)
      console.log(_id, typeof _id)

      req.body.beneficiary = await Beneficiary.findOne({userId: _id, accountNumber, bankCode }); //, 'fullName');
      console.log('bleh', req.body.beneficiary)
      if (!req.body.beneficiary) {
        console.log('entered')
        const result = await PaymentLogicController.createBeneficiary(GATEWAYS.FLUTTERWAVE, accountNumber, bankCode, to.currency, bn);

        if (result.status === 'error' || !result.data) {
          Logger.error(result.message);
          return Response.send(res, UNPROCESSABLE_ENTITY, undefined, UNPROCESSABLE_REQUEST, 'ERROR');
        }

        req.body.beneficiary = await Beneficiary.create({
          userId: _id,
          username,
          beneficiaryId: result.data.id,
          fullName: result.data.full_name,
          accountNumber,
          bankName: result.data.bank_name,
          bankCode,
          currency: to.currency
        });
      }

      console.log('validateBeneficiary passed!');

      return next();
    } catch (err) {
      Logger.error(err.message);
      return Response.send(res, INTERNAL_SERVER_ERROR, undefined, SERVER_ERROR, 'ERROR');
    }
  },
};
