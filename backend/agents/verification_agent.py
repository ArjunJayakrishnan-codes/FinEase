import requests

class VerificationAgent:
    def __init__(self, base_url="http://localhost:5001"):
        self.base_url = base_url

    def process(self, phone_number):
        try:
            crm_resp = requests.get(f"{self.base_url}/crm/{phone_number}")
            if crm_resp.status_code != 200:
                return {"status": "❌ Not Found", "customer_data": None}

            customer = crm_resp.json()

            # Use dataset credit score as base
            base_score = customer["credit_score"]

            # Mock API adds small variation
            credit_resp = requests.get(f"{self.base_url}/credit-score/{phone_number}")
            if credit_resp.status_code == 200:
                variation = credit_resp.json()["credit_score"] % 50 - 25  # between -25 and +25
                customer["credit_score"] = max(600, min(850, base_score + variation))

            return {"status": "Verified ✅", "customer_data": customer}

        except Exception as e:
            return {"status": f"Error: {e}", "customer_data": None}
