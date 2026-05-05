import SalesDashboard from '../components/Sales/SalesDashboard';
import SalesChart from '../components/Sales/SalesChart';
import SalesTable from '../components/Sales/SalesTable';

export default function SalesPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Sales</h1>
      <SalesDashboard />
      <div className="mt-6">
        <SalesChart />
      </div>
      <div className="mt-6">
        <h2 className="text-xl font-bold mb-4">Recent Sales</h2>
        <SalesTable />
      </div>
    </div>
  );
}
