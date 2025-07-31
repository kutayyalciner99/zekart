#!/usr/bin/env python3
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os

app = Flask(__name__)
CORS(app, origins=["https://zek.art", "http://zek.art", "https://www.zek.art"])

# Email configuration
SMTP_SERVER = "atlas.markahost.com"
SMTP_PORT = 587
SENDER_EMAIL = "budak@zek.art"
SENDER_PASSWORD = "p5dwy31cjgqs"
RECIPIENT_EMAIL = "budak@zek.art"


@app.route("/")
def index():
    return send_from_directory(".", "index.html")


@app.route("/<path:filename>")
def serve_file(filename):
    return send_from_directory(".", filename)


@app.route("/send-email", methods=["POST", "OPTIONS"])
def send_email():
    if request.method == "OPTIONS":
        return "", 200

    try:
        data = request.get_json()

        # Extract form data with correct field names
        name = data.get("name", "")
        email = data.get("email", "")
        subject = data.get("subject", "")
        message = data.get("message", "")

        # Validate required fields
        if not all([name, email, subject, message]):
            return (
                jsonify({"success": False, "message": "All fields are required"}),
                400,
            )

        # Create email content
        html_body = f"""
        <html>
        <body>
            <h3>New Contact Form Submission from zek.art</h3>
            <p><strong>Name:</strong> {name}</p>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Message:</strong></p>
            <p>{message}</p>
        </body>
        </html>
        """

        # Create message
        msg = MIMEMultipart()
        msg["From"] = f"{name} <{email}>"
        msg["To"] = RECIPIENT_EMAIL
        msg["Subject"] = f"[zek.art] {subject}"

        msg.attach(MIMEText(html_body, "html"))

        # Send email
        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        server.starttls()
        server.login(SENDER_EMAIL, SENDER_PASSWORD)
        text = msg.as_string()
        server.sendmail(SENDER_EMAIL, RECIPIENT_EMAIL, text)
        server.quit()

        return jsonify({"success": True, "message": "Email sent successfully!"}), 200

    except Exception as e:
        print(f"Error sending email: {str(e)}")
        return jsonify({"success": False, "message": "Failed to send email"}), 500


if __name__ == "__main__":
    # Production settings for zek.art
    app.run(
        host="0.0.0.0",  # Allow external connections
        port=8000,
        debug=False,  # Disable debug mode for production
    )
