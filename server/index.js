import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initDB } from './models/db.js';
import { seedDatabase } from './seed/seedData.js';

// Import routes
import authRoutes from './routes/auth.js';
import customersRoutes from './routes/customers.js';
import inventoryRoutes from './routes/inventory.js';
import salesRoutes from './routes/sales.js';
import ordersRoutes from './routes/orders.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize database
initDB();
seedDatabase();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/customers', customersRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/sales', salesRoutes);
app.use('/api/orders', ordersRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📊 API available at http://localhost:${PORT}/api`);
});
