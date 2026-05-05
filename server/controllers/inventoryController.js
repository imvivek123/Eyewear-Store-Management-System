import db from '../models/db.js';

export function getAllProducts(req, res) {
  try {
    const products = db.prepare('SELECT * FROM products ORDER BY created_at DESC').all();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export function getLowStockProducts(req, res) {
  try {
    // Copilot: implement getLowStockProducts
    // Query all products where stock_quantity <= low_stock_threshold
    // Return sorted by (stock_quantity / low_stock_threshold) ascending
    // Include fields: id, name, brand, sku, stock_quantity, low_stock_threshold
    const products = db.prepare(`
      SELECT id, name, brand, sku, stock_quantity, low_stock_threshold
      FROM products
      WHERE stock_quantity <= low_stock_threshold
      ORDER BY (CAST(stock_quantity AS FLOAT) / low_stock_threshold) ASC
    `).all();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export function createProduct(req, res) {
  try {
    const { name, brand, category, sku, price, stock_quantity, low_stock_threshold } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const result = db.prepare(
      `INSERT INTO products (name, brand, category, sku, price, stock_quantity, low_stock_threshold)
       VALUES (?, ?, ?, ?, ?, ?, ?)`
    ).run(name, brand, category, sku, price, stock_quantity, low_stock_threshold);

    res.status(201).json({ id: result.lastInsertRowid });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export function updateProduct(req, res) {
  try {
    const { id } = req.params;
    const { name, brand, category, sku, price, stock_quantity, low_stock_threshold } = req.body;

    const result = db.prepare(
      `UPDATE products 
       SET name = ?, brand = ?, category = ?, sku = ?, price = ?, stock_quantity = ?, low_stock_threshold = ?
       WHERE id = ?`
    ).run(name, brand, category, sku, price, stock_quantity, low_stock_threshold, id);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export function deleteProduct(req, res) {
  try {
    const { id } = req.params;
    const result = db.prepare('DELETE FROM products WHERE id = ?').run(id);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
