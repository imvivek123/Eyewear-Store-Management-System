import db from '../models/db.js';

export function getAllCustomers(req, res) {
  try {
    const customers = db.prepare('SELECT * FROM customers ORDER BY created_at DESC').all();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export function getCustomerById(req, res) {
  try {
    const { id } = req.params;
    const customer = db.prepare('SELECT * FROM customers WHERE id = ?').get(id);
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    const prescriptions = db.prepare(
      'SELECT * FROM prescriptions WHERE customer_id = ? ORDER BY created_at DESC'
    ).all(id);

    res.json({ ...customer, prescriptions });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export function createCustomer(req, res) {
  try {
    const { name, phone, email, date_of_birth } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const result = db.prepare(
      'INSERT INTO customers (name, phone, email, date_of_birth) VALUES (?, ?, ?, ?)'
    ).run(name, phone, email, date_of_birth);

    res.status(201).json({
      id: result.lastInsertRowid,
      name,
      phone,
      email,
      date_of_birth
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export function updateCustomer(req, res) {
  try {
    const { id } = req.params;
    const { name, phone, email, date_of_birth } = req.body;

    const result = db.prepare(
      'UPDATE customers SET name = ?, phone = ?, email = ?, date_of_birth = ? WHERE id = ?'
    ).run(name, phone, email, date_of_birth, id);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    res.json({ id, name, phone, email, date_of_birth });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export function deleteCustomer(req, res) {
  try {
    const { id } = req.params;
    const result = db.prepare('DELETE FROM customers WHERE id = ?').run(id);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    res.json({ message: 'Customer deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export function addPrescription(req, res) {
  try {
    const { id } = req.params;
    const { right_sphere, right_cylinder, right_axis, left_sphere, left_cylinder, left_axis, pd, prescribed_by, prescription_date, notes } = req.body;

    const result = db.prepare(
      `INSERT INTO prescriptions 
       (customer_id, right_sphere, right_cylinder, right_axis, left_sphere, left_cylinder, left_axis, pd, prescribed_by, prescription_date, notes)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).run(id, right_sphere, right_cylinder, right_axis, left_sphere, left_cylinder, left_axis, pd, prescribed_by, prescription_date, notes);

    res.status(201).json({ id: result.lastInsertRowid });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export function getPrescriptions(req, res) {
  try {
    const { id } = req.params;
    const prescriptions = db.prepare(
      'SELECT * FROM prescriptions WHERE customer_id = ? ORDER BY created_at DESC'
    ).all(id);
    res.json(prescriptions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
