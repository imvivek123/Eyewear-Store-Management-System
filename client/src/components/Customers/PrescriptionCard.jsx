export default function PrescriptionCard({ prescription }) {
  if (!prescription) {
    return <div className="bg-yellow-50 p-4 rounded text-center text-gray-600">No prescription on file</div>;
  }

  return (
    <div className="bg-blue-50 p-4 rounded">
      <h4 className="font-bold mb-3">Prescription Details</h4>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="text-left p-2">Measurement</th>
            <th className="text-center p-2">OD (Right)</th>
            <th className="text-center p-2">OS (Left)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-2">Sphere</td>
            <td className="text-center p-2">{prescription.right_sphere}</td>
            <td className="text-center p-2">{prescription.left_sphere}</td>
          </tr>
          <tr className="bg-gray-50">
            <td className="p-2">Cylinder</td>
            <td className="text-center p-2">{prescription.right_cylinder}</td>
            <td className="text-center p-2">{prescription.left_cylinder}</td>
          </tr>
          <tr>
            <td className="p-2">Axis</td>
            <td className="text-center p-2">{prescription.right_axis}</td>
            <td className="text-center p-2">{prescription.left_axis}</td>
          </tr>
        </tbody>
      </table>
      <div className="mt-3 text-sm text-gray-700">
        <p><strong>PD:</strong> {prescription.pd} mm</p>
        <p><strong>Prescribed by:</strong> {prescription.prescribed_by}</p>
        <p><strong>Date:</strong> {prescription.prescription_date}</p>
        {prescription.notes && <p><strong>Notes:</strong> {prescription.notes}</p>}
      </div>
    </div>
  );
}
