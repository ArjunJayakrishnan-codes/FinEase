export default function CustomerProfile({ customer }) {
  if (!customer) return null;
  return (
    <div className="mt-6 p-4 bg-gray-50 rounded-lg shadow">
      <h3 className="font-semibold mb-2">🧾 Customer Profile</h3>
      <p><b>👤 Name:</b> {customer.name}</p>
      <p><b>📍 City:</b> {customer.address}</p>
      <p><b>⭐ Credit Score:</b> {customer.credit_score}</p>
      <p><b>💳 Limit:</b> ₹{customer.pre_approved_limit}</p>
      <p><b>💼 Salary:</b> ₹{customer.monthly_salary}</p>
    </div>
  );
}
