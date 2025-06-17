import Router from "express";
import { addToCart , getCart } from "../controllers/cart.controller.js";
import protect from "../middleware/auth.js";

const router = Router();

router.route("/addToCart").post(protect, addToCart);

router.route("/getCart").get(protect, getCart);

export default router;
