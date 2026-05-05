import db from '../models/db.js';
import bcrypt from 'bcryptjs';

export function seedDatabase() {
  try {
    // Check if data already exists
    const userCount = db.prepare('SELECT COUNT(*) as count FROM users').get().count;
    if (userCount > 0) {
      console.log('Database already seeded, skipping...');
      return;
    }

    // Add default users
    const storeUserHash = bcrypt.hashSync('store123', 10);
    const hqUserHash = bcrypt.hashSync('hq123', 10);

    db.prepare('INSERT INTO users (username, password_hash, role) VALUES (?, ?, ?)').run(
      'store_user',
      storeUserHash,
      'store'
    );

    db.prepare('INSERT INTO users (username, password_hash, role) VALUES (?, ?, ?)').run(
      'hq_admin',
      hqUserHash,
      'hq'
    );

    // Add sample customers
    const customers = [
      { name: 'John Smith', phone: '555-0101', email: 'john@example.com', date_of_birth: '1985-03-15' },
      { name: 'Sarah Johnson', phone: '555-0102', email: 'sarah@example.com', date_of_birth: '1990-07-22' },
      { name: 'Michael Brown', phone: '555-0103', email: 'michael@example.com', date_of_birth: '1988-11-08' },
      { name: 'Emily Davis', phone: '555-0104', email: 'emily@example.com', date_of_birth: '1992-05-30' },
      { name: 'Robert Wilson', phone: '555-0105', email: 'robert@example.com', date_of_birth: '1980-01-12' }
    ];

    customers.forEach(c => {
      db.prepare('INSERT INTO customers (name, phone, email, date_of_birth) VALUES (?, ?, ?, ?)').run(
        c.name, c.phone, c.email, c.date_of_birth
      );
    });

    // Add sample prescriptions
    db.prepare(`
      INSERT INTO prescriptions 
      (customer_id, right_sphere, right_cylinder, right_axis, left_sphere, left_cylinder, left_axis, pd, prescribed_by, prescription_date, notes)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(1, -1.5, -0.5, 180, -1.25, -0.25, 175, 64.5, 'Dr. Smith', '2024-01-15', 'Standard correction');

    db.prepare(`
      INSERT INTO prescriptions 
      (customer_id, right_sphere, right_cylinder, right_axis, left_sphere, left_cylinder, left_axis, pd, prescribed_by, prescription_date, notes)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(2, -2.0, -1.0, 170, -2.25, -0.75, 165, 63.0, 'Dr. Johnson', '2024-02-10', 'Astigmatism correction');

    // Add sample products
    const products = [
      { name: 'Classic Black Frame', brand: 'Ray-Ban', category: 'frame', sku: 'RB001', price: 149.99, stock_quantity: 15, low_stock_threshold: 5 },
      { name: 'Crystal Clear Lens', brand: 'Essilor', category: 'lens', sku: 'ESL001', price: 99.99, stock_quantity: 3, low_stock_threshold: 5 },
      { name: 'Modern Blue Frame', brand: 'Prada', category: 'frame', sku: 'PR001', price: 299.99, stock_quantity: 8, low_stock_threshold: 5 },
      { name: 'Anti-Glare Coating', brand: 'Crizal', category: 'accessory', sku: 'CRZ001', price: 49.99, stock_quantity: 25, low_stock_threshold: 10 },
      { name: 'Sunglasses Lens', brand: 'Transitions', category: 'lens', sku: 'TRANS001', price: 149.99, stock_quantity: 12, low_stock_threshold: 5 },
      { name: 'Designer Gold Frame', brand: 'Gucci', category: 'frame', sku: 'GUC001', price: 450.0, stock_quantity: 4, low_stock_threshold: 5 }
    ];

    products.forEach(p => {
      db.prepare(`
        INSERT INTO products (name, brand, category, sku, price, stock_quantity, low_stock_threshold)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `).run(p.name, p.brand, p.category, p.sku, p.price, p.stock_quantity, p.low_stock_threshold);
    });

    // Add sample sales
    db.prepare('INSERT INTO sales (customer_id, product_id, quantity, total_price, store_id, sale_date) VALUES (?, ?, ?, ?, ?, ?)').run(
      1, 1, 1, 149.99, 'STORE001', new Date('2024-05-01').toISOString()
    );
    db.prepare('INSERT INTO sales (customer_id, product_id, quantity, total_price, store_id, sale_date) VALUES (?, ?, ?, ?, ?, ?)').run(
      2, 3, 1, 299.99, 'STORE001', new Date('2024-05-02').toISOString()
    );
    db.prepare('INSERT INTO sales (customer_id, product_id, quantity, total_price, store_id, sale_date) VALUES (?, ?, ?, ?, ?, ?)').run(
      3, 2, 2, 199.98, 'STORE001', new Date('2024-05-03').toISOString()
    );

    // Add sample orders
    db.prepare('INSERT INTO orders (customer_id, product_id, quantity, status, notes) VALUES (?, ?, ?, ?, ?)').run(
      4, 5, 1, 'pending', 'Rush order requested'
    );
    db.prepare('INSERT INTO orders (customer_id, product_id, quantity, status, notes) VALUES (?, ?, ?, ?, ?)').run(
      5, 6, 1, 'processing', 'Customization in progress'
    );
    db.prepare('INSERT INTO orders (customer_id, product_id, quantity, status, notes) VALUES (?, ?, ?, ?, ?)').run(
      1, 4, 2, 'completed', 'Delivered'
    );

    console.log('✅ Database seeded successfully!');
  } catch (error) {
    console.error('❌ Failed to seed database:', error.message);
  }
}
