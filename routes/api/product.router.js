/* eslint-disable quotes */
import { Router } from "express";
import ProductController from "../../controllers/productController";
import Authenticator from "../../middlewares/auth.middleware";
import { ROUTES } from "../../helpers/constants";
import Validators from "../../validation/index.validation";
import ShopMiddleware from "../../middlewares/shop.middleware";
import ProductMiddlware from "../../middlewares/product.middleware";
import Guards from "../../middlewares/guards.middleware";

const router = Router();

const { isLoggedIn, getUsernameFromDomain } = Authenticator;
const { validateShop } = ShopMiddleware;
const { populateProduct } = ProductMiddlware;
const { productsLimitGuard } = Guards;

const {
  PRODUCTS: {
    variantStuff,
    addProduct,
    getAllProducts,
    getAllProductsCount,
    getCategoriesAndSubcategories,
    getOneProduct,
    getProductsBatchByIds,
    editProduct,
    deleteOneProduct,
    createProductVariable,
    getProductVariables,
    createOrUpdateProductInventory,
    getProductInventory,
    updateInventoryVariants,
    deleteProductVariable,
    updateProductVariable,
    dispatchPreorderProduct,
    reshapeProductPriceToArray,
  },
} = ROUTES;

const {
  addProductValidator,
  editProductValidator,
  productQueryValidator,
  deleteProductValidator,
  paginationValidator,
  getOneProductValidator,
  getBatchProductsValidator,
  getAllProductsValidator,
  addVariableValidator,
  addInventoryValidator,
  updateInventoryVariantsValidator,
  updateVariablesValidator,
} = Validators;

router.get(variantStuff, ProductController.variantStuff);

router.post(
  addProduct,
  isLoggedIn,
  addProductValidator,
  productsLimitGuard,
  validateShop,
  ProductController.addProduct
);

router.post(
  createProductVariable,
  isLoggedIn,
  addVariableValidator,
  ProductController.addProductVariable
);

router.post(
  createOrUpdateProductInventory,
  isLoggedIn,
  addInventoryValidator,
  ProductController.addOrUpdateProductsInventory
);

router.get(
  getProductInventory,
  isLoggedIn,
  ProductController.getProductInventory
);

router.delete(
  deleteProductVariable,
  isLoggedIn,
  ProductController.deleteProductsVariables
);

router.patch(
  updateProductVariable,
  isLoggedIn,
  updateVariablesValidator,
  ProductController.updateProductsVariables
);

router.get(
  getProductVariables,
  isLoggedIn,
  productQueryValidator,
  ProductController.getProductsVariables
);

router.put(
  updateInventoryVariants,
  isLoggedIn,
  updateInventoryVariantsValidator,
  ProductController.updateProductInventoryVariants
);

router.post(
  dispatchPreorderProduct,
  isLoggedIn,
  populateProduct,
  ProductController.dispatchPreorderProduct
);

router.get(
  getCategoriesAndSubcategories,
  ProductController.getCategoriesAndSubcategories
);

router.post(
  getOneProduct,
  getOneProductValidator,
  getUsernameFromDomain,
  ProductController.getOneProduct
);

router.post(
  getProductsBatchByIds,
  getBatchProductsValidator,
  getUsernameFromDomain,
  ProductController.getProductsBatchByIds
);

router.get(
  getAllProducts,
  getAllProductsValidator,
  paginationValidator,
  productQueryValidator,
  ProductController.getAllProducts
);

router.get(
  getAllProductsCount,
  isLoggedIn,
  ProductController.getAllProductsCount
);

router.patch(
  editProduct,
  isLoggedIn,
  editProductValidator,
  ProductController.editProduct
);

router.delete(
  deleteOneProduct,
  isLoggedIn,
  deleteProductValidator,
  ProductController.deleteOneProduct
);

router.get(
  reshapeProductPriceToArray,
  ProductController.reshapeProductPriceToArray
);

export default router;
