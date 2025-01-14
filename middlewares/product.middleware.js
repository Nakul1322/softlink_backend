/* eslint-disable no-unused-vars */
import StatusCodes from 'http-status-codes';
import { isEmpty, omit } from 'lodash';
import Response from '../helpers/responseHelper';
import { MESSAGE } from '../helpers/constants';
import Models from '../models';
import Logger from '../logs/winston';

const {
  ITEM_NOT_FOUND,
  ITEM_PRICING_MISMATCH,
  SERVER_ERROR,
  OUT_OF_STOCK,
  LOW_STOCK,
  RESOURCE_NOT_FOUND,
} = MESSAGE;

const { INTERNAL_SERVER_ERROR, NOT_FOUND, UNPROCESSABLE_ENTITY } = StatusCodes;

const { Product, ProductInventory } = Models;

export default {
  /**
   * Checks if product is existing, validate price and stock
   * @param {Object} req
   * @param {Object} res
   * @param {*} next
   * @returns {Object} pass on the request body or an error
   */
  validateProduct: async (req, res, next) => {
    const { username, products } = req.body;

    let result;
    const errors = [];

    try {
      for (const [index, product] of products.entries()) {
        // TODO: remove
        if (!index) {
          console.log(product);
        }
        const { id: _id, addedVariants } = product;

        result = await Product.findOne({ _id, username }).lean();
        let inventory = await ProductInventory.findOne({
          productId: _id,
          username,
        }).lean();
        const hasInventory = !!inventory;
        if (!inventory) {
          // To handle default product variant
          inventory = {
            variants: [
              {
                key: _id,
                quantity: result.quantity,
                minOrder: result.minOrder,
                maxOrder: result.maxOrder,
                price: {
                  price: result.price.new,
                  old: result.price.old,
                },
              },
            ],
          };
        }
        const item = `Product ${_id}`;
        result.inventory = inventory;

        // validate existence
        if (!result) {
          errors.push(ITEM_NOT_FOUND.replace('%ITEM%', item));
          continue;
        }

        Object.keys(addedVariants).forEach((variantKey) => {
          const variantErrors = [];
          const itemVariant = `${item} variant: ${variantKey}`;
          const addedVariant = addedVariants[variantKey];
          const variant = inventory.variants.find(
            ({ key }) => key === variantKey
          );
          // validate stock...
          const { quantity: stockAmount, price } = variant;
          const unlimitedProduct = stockAmount === -1;
          const { amount: quantity, price: incPrice } = addedVariant;

          // ...a) out of stock
          if (stockAmount === 0) {
            variantErrors.push(OUT_OF_STOCK.replace('%ITEM%', itemVariant));
            errors.push(OUT_OF_STOCK.replace('%ITEM%', itemVariant));
          }

          // TOASK: What should be done if variant quantity is less then order amount
          // ...b) low stock
          if (!unlimitedProduct && stockAmount < quantity) {
            errors.push(
              LOW_STOCK.replace('%QUANTITY%', stockAmount).replace(
                '%ITEM%',
                itemVariant
              )
            );
            variantErrors.push(
              LOW_STOCK.replace('%QUANTITY%', stockAmount).replace(
                '%ITEM%',
                itemVariant
              )
            );
          }
          // validate pricing
          // if (incPrice !== price.price) {
          //   errors.push(ITEM_PRICING_MISMATCH.replace('%ITEM%', itemVariant));
          //   variantErrors.push(
          //     ITEM_PRICING_MISMATCH.replace('%ITEM%', itemVariant)
          //   );
          // }
          if (variantErrors.length) {
            // TODO: smthng to validate orders with errors like
            // unset(product.addedVariants, variantKey);
          }
        });

        if (!isEmpty(errors)) continue;

        // modify the request body
        req.body.products[index] = {
          ...omit(product, ['id']),
          ...omit(result, ['quantity', 'price']),
          price: result.price.new, // hack to take out the price from inside the object
          // In order to pass "unlimitedProduct" to the controller
          ...(!hasInventory && { unlimitedProduct: result.quantity === -1 }),
        };
      }

      return !isEmpty(errors)
        ? Response.send(res, UNPROCESSABLE_ENTITY, undefined, errors, 'ERROR')
        : next();
    } catch (err) {
      Logger.error(err.message);

      return Response.send(
        res,
        INTERNAL_SERVER_ERROR,
        undefined,
        SERVER_ERROR,
        'ERROR'
      );
    }
  },

  /**
   * Get product info shortcut
   * @param {Object} req
   * @param {Object} res
   * @param {*} next
   * @returns {Object} pass on the request body or an error
   */
  populateProduct: async (req, res, next) => {
    const { productId: _id } = req.params;

    try {
      req.body.product = await Product.findOne({ _id });

      return !req.body.product
        ? Response.send(res, NOT_FOUND, undefined, RESOURCE_NOT_FOUND, 'ERROR')
        : next();
    } catch (err) {
      Logger.error(err.message);

      return Response.send(
        res,
        INTERNAL_SERVER_ERROR,
        undefined,
        SERVER_ERROR,
        'ERROR'
      );
    }
  },
};
