from reportlab.lib.pagesizes import A4
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, Image
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors
from datetime import datetime

class SanctionLetterAgent:
    def generate_letter(self, customer, loan_details, file_path):
        doc = SimpleDocTemplate(file_path, pagesize=A4)
        styles = getSampleStyleSheet()
        elements = []

        # --- Company Header ---
        company_name = Paragraph(
            "<b><font size=16 color='navy'>FinEase</font></b>",
            styles["Title"],
        
        )
        elements.append(company_name)
        elements.append(Spacer(1, 20))

        # --- Document Title ---
        title = Paragraph(
            "<b><font size=14>Loan Sanction Letter</font></b>",
            ParagraphStyle("centered", alignment=1, spaceAfter=20),
        )
        elements.append(title)

        # --- Date ---
        date = Paragraph(f"<b>Date:</b> {datetime.today().strftime('%d-%m-%Y')}", styles["Normal"])
        elements.append(date)
        elements.append(Spacer(1, 20))

        # --- Customer Info ---
        customer_info = Paragraph(
            f"<b>To,</b><br/>"
            f"{customer['name']}<br/>"
            f"Phone: {customer['phone']}<br/>"
            f"Address: {customer['address']}<br/><br/>",
            styles["Normal"],
        )
        elements.append(customer_info)

        body_intro = Paragraph(
            "We are pleased to inform you that your loan request has been approved based on your profile and credit evaluation. "
            "The details of your sanctioned loan are as follows:",
            styles["Normal"],
        )
        elements.append(body_intro)
        elements.append(Spacer(1, 20))

        # --- Loan Details Table ---
        data = [
            ["Loan Amount (₹)", "Tenure (Months)", "Interest Rate (%)", "Monthly EMI (₹)"],
            [
                f"{loan_details['amount']:,}",
                loan_details["tenure"],
                loan_details["rate"],
                f"{loan_details['emi']:,}",
            ],
        ]

        table = Table(data, hAlign="CENTER", colWidths=[120, 120, 120, 120])
        table.setStyle(
            TableStyle(
                [
                    ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#1e3a8a")),  # navy blue
                    ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
                    ("ALIGN", (0, 0), (-1, -1), "CENTER"),
                    ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
                    ("BOTTOMPADDING", (0, 0), (-1, 0), 10),
                    ("BACKGROUND", (0, 1), (-1, -1), colors.whitesmoke),
                    ("GRID", (0, 0), (-1, -1), 1, colors.black),
                ]
            )
        )
        elements.append(table)
        elements.append(Spacer(1, 30))

        # --- Closing Note ---
        closing = Paragraph(
            "Kindly visit our nearest branch to complete the documentation and disbursement formalities.<br/><br/>"
            "We thank you for choosing <b>FinEase Finance</b> as your trusted partner.",
            styles["Normal"],
        )
        elements.append(closing)
        elements.append(Spacer(1, 50))

        # --- Signature Block ---
        signature = Paragraph(
            "Sincerely,<br/><br/>"
            "<b>Authorised Signatory</b><br/>"
            "FinEase",
            styles["Normal"],
        )
        elements.append(signature)

        # Build PDF
        doc.build(elements)
