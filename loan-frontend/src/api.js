const BACKEND_URL = "http://localhost:5000";
const CRM_URL = "http://localhost:5001";

export async function verifyCustomer(phone) {
  const res = await fetch(`${CRM_URL}/crm/${phone}`);
  if (!res.ok) throw new Error("Customer not found");
  return await res.json();
}

export async function submitLoanRequest(customer, loanDetails) {
  const res = await fetch(`${BACKEND_URL}/loan/request`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ customer, loanDetails }),
  });
  if (!res.ok) throw new Error("Loan request failed");
  return await res.json();
}

export async function downloadSanctionLetter(fileName) {
  const res = await fetch(`${BACKEND_URL}/sanctions/${fileName}`);
  if (!res.ok) throw new Error("Failed to download sanction letter");
  return await res.blob();
}

export async function sendMessage(message, customer) {
  const res = await fetch(`${BACKEND_URL}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, customer }),
  });
  if (!res.ok) throw new Error("Message send failed");
  return await res.json();
}
