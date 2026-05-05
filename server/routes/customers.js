import express from 'express';
import {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  addPrescription,
  getPrescriptions
} from '../controllers/customersController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { roleMiddleware } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/', getAllCustomers);
router.get('/:id', getCustomerById);
router.post('/', createCustomer);
router.put('/:id', updateCustomer);
router.delete('/:id', roleMiddleware('hq'), deleteCustomer);

router.post('/:id/prescriptions', addPrescription);
router.get('/:id/prescriptions', getPrescriptions);

export default router;
