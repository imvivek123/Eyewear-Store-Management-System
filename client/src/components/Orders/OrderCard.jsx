export default function OrderCard({ order }) {
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    processing: 'bg-blue-100 text-blue-800 border-blue-300',
    completed: 'bg-green-100 text-green-800 border-green-300',
    cancelled: 'bg-red-100 text-red-800 border-red-300'
  };

  const status = order.status || 'pending';
  const statusClass = statusColors[status] || statusColors.pending;

  return (
    <div className="bg-white border-l-4 border-blue-500 p-4 rounded shadow mb-3">
      <div className="flex justify-between items-start mb-2">
        <div>
          <p className="font-semibold text-lg">Order #{order.id}</p>
          <p className="text-sm text-gray-600">Customer ID: {order.customer_id}</p>
        </div>
        <span className={`px-3 py-1 rounded text-sm font-semibold border ${statusClass}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
        <p><strong>Product ID:</strong> {order.product_id}</p>
        <p><strong>Quantity:</strong> {order.quantity}</p>
        <p><strong>Created:</strong> {new Date(order.created_at).toLocaleDateString()}</p>
        <p><strong>Updated:</strong> {new Date(order.updated_at).toLocaleDateString()}</p>
      </div>
      {order.notes && (
        <p className="text-sm text-gray-600 mt-2"><strong>Notes:</strong> {order.notes}</p>
      )}
    </div>
  );
}
