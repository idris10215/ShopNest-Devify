import Router from "express";
import { addToCart , getCart, updateCartItem, removeCartItem } from "../controllers/cart.controller.js";
import protect from "../middleware/auth.js";

const router = Router();

router.route("/addToCart").post(protect, addToCart);

router.route("/getCart").get(protect, getCart);

router.route("/updateCartItem/:productId").put(protect, updateCartItem);

router.route("/removeCartItem/:productId").delete(protect, removeCartItem);

export default router;
