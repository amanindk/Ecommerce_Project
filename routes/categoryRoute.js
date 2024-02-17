import express from "express";
import { isAdmin, requireSignIn } from "./../middlewars/authmiddlewars.js";
import {
  categaryController,
  createCategoryController,
  deleteCategoryController,
  singlecategoryController,
  updateCategoryController,
} from "../controllers/categoryController.js";

const categoryRoute = express.Router();

//routes
//create Category
categoryRoute.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
);

//update category
categoryRoute.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);

//getAll Category
categoryRoute.get("/get-category", categaryController);

//single Category
categoryRoute.get("/single-category/:slug", singlecategoryController);

//Delete category
categoryRoute.delete(
  "/delete-category/:id",
  requireSignIn,
  isAdmin,
  deleteCategoryController
);

export default categoryRoute;
