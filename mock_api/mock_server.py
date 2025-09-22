# mock_api/mock_server.py
from flask import Flask, jsonify
from flask_cors import CORS
import json, os, sys

app = Flask(__name__)
CORS(app)  # allow requests from the frontend dev server

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_FILE = os.path.join(BASE_DIR, "data", "customers.json")

if not os.path.exists(DATA_FILE):
    print("ERROR: customers.json not found at:", DATA_FILE, file=sys.stderr)
    sys.exit(1)

with open(DATA_FILE, "r", encoding="utf-8") as f:
    customers = json.load(f)

print("Mock CRM loaded:", DATA_FILE)
print("Customers count:", len(customers))
print("Phones:", [str(c.get("phone")) for c in customers])

@app.route("/crm/<phone>", methods=["GET"])
def get_customer(phone):
    for customer in customers:
        if str(customer.get("phone")) == str(phone):
            print(f"GET /crm/{phone} -> FOUND {customer.get('name')}")
            return jsonify(customer)
    print(f"GET /crm/{phone} -> NOT FOUND")
    return jsonify({"error": "Customer not found"}), 404

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)
