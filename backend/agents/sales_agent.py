import re

class SalesAgent:
    def process(self, user_message):
        match = re.search(r'(\d+)', user_message.replace(",", ""))
        if match:
            requested_amount = int(match.group(1)) * 1000
            return requested_amount, f"Got it. You are requesting ₹{requested_amount}. Let's proceed."
        else:
            return None, "Please specify the loan amount (e.g., 'I need 3 lakhs')."
