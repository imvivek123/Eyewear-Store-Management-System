export default function HQPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">HQ Dashboard</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-blue-50 p-6 rounded shadow">
          <h3 className="text-lg font-bold mb-2">All Stores Summary</h3>
          <p className="text-3xl font-bold text-blue-600">-</p>
          <p className="text-sm text-gray-600">Top-level metrics would display here</p>
        </div>
        <div className="bg-green-50 p-6 rounded shadow">
          <h3 className="text-lg font-bold mb-2">Inventory Overview</h3>
          <p className="text-3xl font-bold text-green-600">-</p>
          <p className="text-sm text-gray-600">Global inventory status</p>
        </div>
        <div className="bg-purple-50 p-6 rounded shadow">
          <h3 className="text-lg font-bold mb-2">Order Status</h3>
          <p className="text-3xl font-bold text-purple-600">-</p>
          <p className="text-sm text-gray-600">All orders across stores</p>
        </div>
      </div>
    </div>
  );
}
