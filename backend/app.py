from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from agents.master_agent import MasterAgent
import os

app = Flask(__name__)
CORS(app)

master_agent = MasterAgent()

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    message = data.get("message", "").strip()
    customer = data.get("customer")

    if customer:
        master_agent.customer = customer

    if not message:
        return jsonify({"response": "⚠️ Please type something."})

    reply, sanction_file = master_agent.handle_message(message)
    return jsonify({"response": reply, "sanction_letter": sanction_file})

@app.route("/loan/request", methods=["POST"])
def loan_request():
    data = request.get_json()
    customer = data.get("customer", {})
    loan_details = data.get("loanDetails", {})
    reply = master_agent.process_loan(customer, loan_details)
    return jsonify(reply)

@app.route("/sanctions/<filename>")
def get_sanction(filename):
    sanctions_dir = os.path.join(os.path.dirname(__file__), "sanctions")
    return send_from_directory(sanctions_dir, filename, as_attachment=True)

if __name__ == "__main__":
    app.run(port=5000, debug=True)
