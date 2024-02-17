import express from "express";
import {
  forgotPasswordController,
  getAllOrdersController,
  getOrdersController,
  loginController,
  orderStatusController,
  registerController,
  testController,
  updateProfileController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewars/authmiddlewars.js";

//router object
const router = express.Router();

//routing
//Register || Method Post
router.post("/register", registerController);

//Login || Post
router.post("/login", loginController);

//Forgot Password || Post
router.post("/forgot-password", forgotPasswordController);

//text routes
router.get("/test", requireSignIn, isAdmin, testController);

//protected user route- auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

//protected Admin-route-auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//update profile
router.put("/profile-update", requireSignIn, updateProfileController);

//order routes
router.get("/orders", requireSignIn, getOrdersController);

//All order
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

//order status update
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);
export default router;
