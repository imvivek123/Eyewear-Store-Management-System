import db from '../models/db.js';

export function getAllOrders(req, res) {
  try {
    const { status } = req.query;
    let query = 'SELECT * FROM orders';
    const params = [];

    if (status) {
      query += ' WHERE status = ?';
      params.push(status);
    }

    query += ' ORDER BY created_at DESC';
    const orders = db.prepare(query).all(...params);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export function createOrder(req, res) {
  try {
    const { customer_id, product_id, quantity, status, notes } = req.body;

    if (!customer_id || !product_id || !quantity) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const result = db.prepare(
      `INSERT INTO orders (customer_id, product_id, quantity, status, notes)
       VALUES (?, ?, ?, ?, ?)`
    ).run(customer_id, product_id, quantity, status || 'pending', notes);

    res.status(201).json({ id: result.lastInsertRowid });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export function updateOrderStatus(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ error: 'Status is required' });
    }

    const result = db.prepare(
      'UPDATE orders SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?'
    ).run(status, id);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json({ id, status });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export function deleteOrder(req, res) {
  try {
    const { id } = req.params;
    const result = db.prepare('DELETE FROM orders WHERE id = ?').run(id);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json({ message: 'Order deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
