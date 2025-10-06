class UnderwritingAgent:
    def process(self, loan_amount, customer_data, salary_slip=None):
        pre_approved = customer_data["pre_approved_limit"]
        credit_score = customer_data["credit_score"]
        salary = customer_data["monthly_salary"]

        # Basic sanity check
        if loan_amount < 50000:
            return "❌ Loan Rejected (Amount too low for personal loan)."

        # Credit score rules
        if credit_score < 700:
            return "❌ Loan Rejected (Credit Score < 700)."
        elif 700 <= credit_score < 750:
            interest_rate = 16
        elif 750 <= credit_score < 800:
            interest_rate = 13
        else:
            interest_rate = 11

        # Loan approval logic
        if loan_amount <= pre_approved:
            return f"✅ Loan Approved instantly at {interest_rate}% interest."
        
        elif loan_amount <= 2 * pre_approved:
            if salary_slip:
                emi = loan_amount / 24  # 24-month tenure for simplicity
                if emi <= 0.5 * salary:
                    return f"✅ Loan Approved after salary verification at {interest_rate}% interest."
                else:
                    return "❌ Loan Rejected (EMI > 50% of monthly salary)."
            else:
                return "⚠️ Please upload salary slip for further evaluation."
        
        else:
            return "❌ Loan Rejected (Requested > 2× pre-approved limit)."
