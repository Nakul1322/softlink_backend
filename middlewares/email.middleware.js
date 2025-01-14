import StatusCodes from 'http-status-codes';
import spamCheck from 'spam-check';
import Response from '../helpers/responseHelper';
import { MESSAGE } from '../helpers/constants';
import Logger from '../logs/winston';

const {
  SPAM_DETECTED,
  SERVER_ERROR,
} = MESSAGE;

const {
  INTERNAL_SERVER_ERROR,
  UNPROCESSABLE_ENTITY,
} = StatusCodes;

export default {
  /**
   * Check for spam contents
   * @param {Object} req
   * @param {Object} res
   * @param {*} next
   * @returns {Object} pass on the request body or an error
   */
  spamCheck: (req, res, next) => {
    const { body } = req.body;

    try {
      const options = { string: body };

      spamCheck(options, (err, { spam }) => (err
        ? Response.send(res, INTERNAL_SERVER_ERROR, undefined, SERVER_ERROR, 'ERROR')
        : spam
          ? Response.send(res, UNPROCESSABLE_ENTITY, undefined, SPAM_DETECTED, 'ERROR')
          : next()));
    } catch (e) {
      Logger.error(e.message);
      return Response.send(res, INTERNAL_SERVER_ERROR, undefined, SERVER_ERROR, 'ERROR');
    }
  }
};
