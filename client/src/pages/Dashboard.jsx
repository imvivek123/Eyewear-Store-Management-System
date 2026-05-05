import SalesDashboard from '../components/Sales/SalesDashboard';
import SalesChart from '../components/Sales/SalesChart';
import LowStockAlert from '../components/Inventory/LowStockAlert';

export default function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      <LowStockAlert />
      
      <div className="mt-6">
        <SalesDashboard />
      </div>

      <div className="mt-6">
        <SalesChart />
      </div>
    </div>
  );
}
