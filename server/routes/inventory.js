import express from 'express';
import {
  getAllProducts,
  getLowStockProducts,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/inventoryController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { roleMiddleware } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/', getAllProducts);
router.get('/low-stock', getLowStockProducts);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', roleMiddleware('hq'), deleteProduct);

export default router;
