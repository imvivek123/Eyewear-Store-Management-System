import express from 'express';
import {
  getAllOrders,
  createOrder,
  updateOrderStatus,
  deleteOrder
} from '../controllers/ordersController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/', getAllOrders);
router.post('/', createOrder);
router.put('/:id/status', updateOrderStatus);
router.delete('/:id', deleteOrder);

export default router;
