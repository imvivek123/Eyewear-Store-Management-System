import express from 'express';
import {
  getAllSales,
  getSalesSummary,
  getSalesByProduct,
  createSale
} from '../controllers/salesController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/', getAllSales);
router.get('/summary', getSalesSummary);
router.get('/by-product', getSalesByProduct);
router.post('/', createSale);

export default router;
