import db from '../models/db.js';

export function getAllSales(req, res) {
  try {
    const sales = db.prepare('SELECT * FROM sales ORDER BY sale_date DESC LIMIT 100').all();
    res.json(sales);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export function getSalesSummary(req, res) {
  try {
    // Copilot: implement sales summary that groups by date and returns daily totals for last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const fromDate = thirtyDaysAgo.toISOString().split('T')[0];

    const summary = db.prepare(`
      SELECT 
        DATE(sale_date) as date,
        SUM(total_price) as total
      FROM sales
      WHERE DATE(sale_date) >= ?
      GROUP BY DATE(sale_date)
      ORDER BY date DESC
    `).all(fromDate);

    res.json(summary);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export function getSalesByProduct(req, res) {
  try {
    const byProduct = db.prepare(`
      SELECT 
        p.id,
        p.name,
        p.brand,
        SUM(s.quantity) as total_quantity,
        SUM(s.total_price) as total_revenue
      FROM sales s
      JOIN products p ON s.product_id = p.id
      GROUP BY p.id
      ORDER BY total_revenue DESC
    `).all();

    res.json(byProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export function createSale(req, res) {
  try {
    const { customer_id, product_id, quantity, total_price, store_id } = req.body;
    
    if (!product_id || !quantity || !total_price) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Update inventory
    db.prepare('UPDATE products SET stock_quantity = stock_quantity - ? WHERE id = ?').run(quantity, product_id);

    const result = db.prepare(
      `INSERT INTO sales (customer_id, product_id, quantity, total_price, store_id)
       VALUES (?, ?, ?, ?, ?)`
    ).run(customer_id, product_id, quantity, total_price, store_id);

    res.status(201).json({ id: result.lastInsertRowid });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
