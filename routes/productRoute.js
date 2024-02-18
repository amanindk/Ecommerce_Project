import express from "express";
import { isAdmin, requireSignIn } from "../middlewars/authmiddlewars.js";
import {
  braintreePaymentController,
  braintreeTokenController,
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productCategoryController,
  productCountController,
  productFilterConroller,
  productListController,
  productphotoController,
  relatedProductsController,
  searchProductController,
  updateProductController,
} from "../controllers/productController.js";
import formidable from "express-formidable";

const router = express.Router();

//routes
//create-product
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

//update-product
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

//get-product
router.get("/get-product", getProductController);

//get-Single-Product
router.get("/get-product/:slug", getSingleProductController);

//get-photo
router.get("/product-photo/:pid", productphotoController);

//del product
router.delete("/delete-product/:pid", deleteProductController);

//filter product
router.post("/product-filters", productFilterConroller);

//count product
router.get("/product-count", productCountController);

//product per page
router.get("/product-list/:page", productListController);

//search product
router.get("/search/:keyword", searchProductController);

//similar products
router.get("/related-product/:pid/:cid", relatedProductsController);

//category wise product
router.get("/product-category/:slug", productCategoryController);

//product payment routes
//token
router.get("/braintree/token", braintreeTokenController);

//payments
router.post("/braintree/payment", requireSignIn, braintreePaymentController);


export default router;