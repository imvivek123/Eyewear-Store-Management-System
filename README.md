# 👓 Eyewear Store Management System (PixiPMS-Inspired)

A full-stack Point of Management System for eyewear retail stores built with **React + Node.js + SQLite + Docker**.

## 🎯 Overview

This is a comprehensive web application designed for managing the complete workflow of an eyewear retail business, including customers, prescriptions, inventory, sales, and orders.

### Key Features
- 🔐 **Role-Based Access Control** - Separate views for Store Staff and HQ Managers
- 👥 **Customer Management** - Full customer profiles with prescription history
- 👓 **Prescription Tracking** - Store optometric data (sphere, cylinder, axis, PD)
- 📦 **Inventory Management** - Product catalog with low-stock alerts
- 💰 **Sales Dashboard** - Real-time sales tracking and analytics
- 📋 **Order Management** - Track orders with status updates
- 📊 **Analytics Charts** - Daily revenue trends and product performance

---

## 📁 Project Structure

```
eyewear-management-system/
├── client/                        # React frontend
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── components/            # React components
│       │   ├── Layout/           # Navbar, Sidebar
│       │   ├── Customers/        # Customer UI components
│       │   ├── Inventory/        # Inventory UI components
│       │   ├── Sales/            # Sales UI components
│       │   ├── Orders/           # Orders UI components
│       │   └── Auth/             # Login, Protected Routes
│       ├── pages/                # Page components
│       ├── context/              # AuthContext for auth state
│       ├── services/             # API client (Axios)
│       ├── App.jsx
│       └── main.jsx
│
├── server/                        # Express.js backend
│   ├── routes/                   # API routes
│   ├── controllers/              # Business logic
│   ├── middleware/               # Auth & Role middleware
│   ├── models/                   # Database setup
│   ├── seed/                     # Sample data
│   ├── package.json
│   └── index.js                  # Entry point
│
├── Dockerfile.client             # React build & Nginx
├── Dockerfile.server             # Node.js server
├── docker-compose.yml            # Container orchestration
├── nginx.conf                    # Nginx configuration
├── .gitignore
└── README.md
```

---

## ⚡ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18, React Router v6, Axios, Recharts |
| **Backend** | Node.js, Express.js |
| **Database** | SQLite (better-sqlite3) |
| **Authentication** | JWT (JSON Web Tokens) |
| **Styling** | Tailwind CSS |
| **Containerization** | Docker & Docker Compose |
| **Deployment** | AWS ECS ready |

---

## 🗄️ Database Schema

### Core Tables

**users**
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  username TEXT UNIQUE,
  password_hash TEXT,
  role TEXT -- 'store' | 'hq'
);
```

**customers**
```sql
CREATE TABLE customers (
  id INTEGER PRIMARY KEY,
  name TEXT,
  phone TEXT,
  email TEXT,
  date_of_birth TEXT,
  created_at DATETIME
);
```

**prescriptions**
```sql
CREATE TABLE prescriptions (
  id INTEGER PRIMARY KEY,
  customer_id INTEGER,
  right_sphere REAL, right_cylinder REAL, right_axis INTEGER,
  left_sphere REAL, left_cylinder REAL, left_axis INTEGER,
  pd REAL,
  prescribed_by TEXT,
  prescription_date TEXT,
  notes TEXT
);
```

**products**
```sql
CREATE TABLE products (
  id INTEGER PRIMARY KEY,
  name TEXT, brand TEXT, category TEXT,
  sku TEXT UNIQUE,
  price REAL,
  stock_quantity INTEGER,
  low_stock_threshold INTEGER
);
```

**sales**
```sql
CREATE TABLE sales (
  id INTEGER PRIMARY KEY,
  customer_id INTEGER,
  product_id INTEGER,
  quantity INTEGER,
  total_price REAL,
  sale_date DATETIME,
  store_id TEXT
);
```

**orders**
```sql
CREATE TABLE orders (
  id INTEGER PRIMARY KEY,
  customer_id INTEGER,
  product_id INTEGER,
  quantity INTEGER,
  status TEXT, -- 'pending' | 'processing' | 'completed' | 'cancelled'
  notes TEXT,
  created_at DATETIME,
  updated_at DATETIME
);
```

---

## 🔌 API Endpoints

### Authentication
```
POST   /api/auth/login              # Login (returns JWT)
POST   /api/auth/register           # Register (HQ only)
```

### Customers
```
GET    /api/customers               # List all customers
GET    /api/customers/:id           # Get customer with prescriptions
POST   /api/customers               # Create customer
PUT    /api/customers/:id           # Update customer
DELETE /api/customers/:id           # Delete (HQ only)
POST   /api/customers/:id/prescriptions  # Add prescription
GET    /api/customers/:id/prescriptions  # Get prescriptions
```

### Inventory
```
GET    /api/inventory               # List all products
GET    /api/inventory/low-stock     # Get low stock products
POST   /api/inventory               # Create product
PUT    /api/inventory/:id           # Update product
DELETE /api/inventory/:id           # Delete (HQ only)
```

### Sales
```
GET    /api/sales                   # List recent sales
GET    /api/sales/summary           # Daily totals (30 days)
GET    /api/sales/by-product        # Sales grouped by product
POST   /api/sales                   # Record sale
```

### Orders
```
GET    /api/orders                  # List all orders
GET    /api/orders?status=pending   # Filter by status
POST   /api/orders                  # Create order
PUT    /api/orders/:id/status       # Update order status
DELETE /api/orders/:id              # Cancel order
```

---

## 👥 Role-Based Access

| Feature | Store | HQ |
|---------|-------|-----|
| View Data | ✅ | ✅ |
| Add Customers/Products | ✅ | ✅ |
| Delete Customers/Products | ❌ | ✅ |
| Record Sales | ✅ | ✅ |
| View All Store Sales | Store's only | All stores |
| Register Users | ❌ | ✅ |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Docker & Docker Compose (for containerized setup)

### Without Docker (Local Development)

#### 1. Backend Setup
```bash
cd server
npm install
npm run seed    # Populate sample data
npm run dev     # Runs on http://localhost:5000
```

#### 2. Frontend Setup (new terminal)
```bash
cd client
npm install
npm run dev     # Runs on http://localhost:3000
```

### With Docker

```bash
docker-compose up --build
# Frontend: http://localhost:3000
# Backend API: http://localhost:5000/api
```

---

## 🔑 Default Login Credentials

| Role | Username | Password |
|------|----------|----------|
| Store Staff | `store_user` | `store123` |
| HQ Manager | `hq_admin` | `hq123` |

These are seeded in the database automatically on first run.

---

## 📊 Dashboard Features

### Store Dashboard
- **Today's Sales** - Total revenue card
- **Low Stock Alerts** - Real-time inventory warnings
- **Sales Chart** - 30-day revenue trends
- **Recent Orders** - Latest order status

### HQ Dashboard
- **Aggregated Sales** - Totals across all stores
- **Inventory Overview** - Global stock levels
- **Sales Comparison** - Performance by store
- **Order Status Breakdown** - Pie chart of order states

---

## 🛠️ Development Notes

### Environment Variables
Create a `.env` file in the `server` directory:
```env
JWT_SECRET=your_secure_jwt_secret_here
PORT=5000
```

### Adding a New Feature
1. Create database model/table if needed in `server/models/db.js`
2. Add controller logic in `server/controllers/`
3. Create route in `server/routes/`
4. Build React component in `client/src/components/`
5. Add API call via `client/src/services/api.js`

### Low Stock Alert Logic
The system automatically flags products where `stock_quantity <= low_stock_threshold`. Products are sorted by criticality ratio (lowest ratio = most critical).

---

## 🐳 Docker Deployment

### Build Images
```bash
docker build -f Dockerfile.server -t eyewear-server:latest .
docker build -f Dockerfile.client -t eyewear-client:latest .
```

### Push to AWS ECR
```bash
aws ecr get-login-password --region us-east-1 | \
  docker login --username AWS --password-stdin <account-id>.dkr.ecr.us-east-1.amazonaws.com

docker tag eyewear-server:latest <account-id>.dkr.ecr.us-east-1.amazonaws.com/eyewear-server:latest
docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/eyewear-server:latest
```

### AWS ECS Deployment
1. Create Task Definition with both container images
2. Launch ECS Service with Application Load Balancer
3. Store JWT_SECRET in AWS Secrets Manager
4. Configure environment variables in Task Definition

---

## 📝 API Examples

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "store_user", "password": "store123"}'
```

Response:
```json
{
  "token": "eyJhbGc...",
  "user": {"id": 1, "username": "store_user", "role": "store"}
}
```

### Add Customer
```bash
curl -X POST http://localhost:5000/api/customers \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "phone": "555-1234",
    "email": "jane@example.com",
    "date_of_birth": "1995-06-20"
  }'
```

### Record Sale
```bash
curl -X POST http://localhost:5000/api/sales \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "customer_id": 1,
    "product_id": 2,
    "quantity": 1,
    "total_price": 149.99,
    "store_id": "STORE001"
  }'
```

---

## 🔒 Security Features

- ✅ JWT-based authentication
- ✅ Role-based access control (RBAC)
- ✅ Password hashing with bcryptjs
- ✅ CORS enabled for cross-origin requests
- ✅ SQL parameterization (no SQL injection)

---


---
