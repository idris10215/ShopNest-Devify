import Router from 'express';
import upload from '../middleware/upload.js';
import protect from '../middleware/auth.js';
import { adminOnly } from '../middleware/auth.js';
import {addProduct, getProducts} from '../controllers/product.controller.js';

const router = Router();

router.route("/add").post(protect, adminOnly, upload.single('image'), addProduct);

router.route("/").get(getProducts);

export default router;