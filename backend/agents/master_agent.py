import re
import os
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from datetime import datetime

class MasterAgent:
    def __init__(self):
        self.customer = None

    def handle_message(self, message: str):
        msg = message.lower()
        numbers = re.findall(r"\d+", msg)
        amount = int(numbers[0]) if numbers else None
        sanction_file = None

        if "lakh" in msg and amount:
            requested = amount * 100000
            reply, sanction_file = self._check_limit(requested)

        elif "crore" in msg and amount:
            requested = amount * 10000000
            reply, sanction_file = self._check_limit(requested)

        elif "loan" in msg and not amount:
            reply = "💡 Please specify the loan amount in lakhs or crores."
        elif "hello" in msg or "hi" in msg:
            reply = f"👋 Hello {self.customer.get('name')}! Please tell me the loan amount you need." if self.customer else "👋 Hello! Please tell me the loan amount you need."
        else:
            reply = "🤖 I didn’t understand. Please mention your loan amount in lakhs or crores."

        return reply, sanction_file

    def _check_limit(self, requested):
        if not self.customer:
            return f"⚠️ Please enter your phone number first.", None

        limit = self.customer.get("pre_approved_limit", 0)
        if requested <= limit:
            # ✅ Generate sanction letter dynamically
            file_name = f"sanction_{self.customer['phone']}.pdf"
            file_path = os.path.join(os.path.dirname(__file__), "..", "sanctions", file_name)
            os.makedirs(os.path.dirname(file_path), exist_ok=True)

            c = canvas.Canvas(file_path, pagesize=letter)
            c.setFont("Helvetica", 12)
            c.drawString(100, 750, "Loan Sanction Letter")
            c.drawString(100, 730, f"Customer: {self.customer['name']}")
            c.drawString(100, 710, f"Phone: {self.customer['phone']}")
            c.drawString(100, 690, f"Approved Loan Amount: ₹{requested:,}")
            c.drawString(100, 670, f"Date: {datetime.now().strftime('%d-%m-%Y')}")
            c.save()

            return (
                f"🎉 Approved! Your requested loan of ₹{requested:,} is within your pre-approved limit of ₹{limit:,}.",
                file_name,
            )
        else:
            return (
                f"❌ Sorry, your requested amount ₹{requested:,} exceeds your limit of ₹{limit:,}.",
                None,
            )
