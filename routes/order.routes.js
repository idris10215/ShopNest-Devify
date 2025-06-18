import Router from 'express';
import { getMyOrders, placeOrder,cancelOrder, getAllOrders, updateOrderStatus } from '../controllers/order.controller.js';
import protect from '../middleware/auth.js';
import { adminOnly } from '../middleware/auth.js';

const router = Router();

router.route("/checkout").post(protect, placeOrder);
router.route("/myOrders").get(protect, getMyOrders);

router.route("/getAllOrders").get(protect, adminOnly, getAllOrders);

router.route("/:id/status").put(protect, adminOnly, updateOrderStatus);

router.route("/:id/cancel").put(protect, cancelOrder);

export default router;