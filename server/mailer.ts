import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.qiye.163.com",
  port: parseInt(process.env.SMTP_PORT || "465"),
  secure: true,
  auth: {
    user: process.env.SMTP_USER || "infor@paralight.cc",
    pass: process.env.SMTP_PASS || "3ggTB753rVXtWDBR",
  },
});

export async function sendRequestConfirmation(to: string, name: string, catalogueName: string) {
  await transporter.sendMail({
    from: `"Paralight" <${process.env.SMTP_USER || "infor@paralight.cc"}>`,
    to,
    subject: "Catalogue Download Request Received — Paralight",
    html: `
      <div style="font-family:Arial,sans-serif;max-width:520px;margin:0 auto;color:#1C1410">
        <div style="background:#1a2332;padding:28px 32px;border-radius:12px 12px 0 0">
          <h1 style="color:#fff;font-size:22px;margin:0;letter-spacing:1px">PARALIGHT</h1>
        </div>
        <div style="background:#f9f6f0;padding:32px;border-radius:0 0 12px 12px;border:1px solid #e8dcc8;border-top:none">
          <p style="font-size:16px;margin-top:0">Hi <strong>${name}</strong>,</p>
          <p>Thank you for your interest in our <strong>${catalogueName}</strong>.</p>
          <p>We have received your request and our team will review it shortly. Once approved, you will receive a download code via email.</p>
          <p style="color:#8B6830;font-size:13px;margin-top:32px">— The Paralight Team</p>
        </div>
      </div>
    `,
  });
}

export async function sendDownloadCode(to: string, name: string, code: string, catalogueName: string) {
  await transporter.sendMail({
    from: `"Paralight" <${process.env.SMTP_USER || "infor@paralight.cc"}>`,
    to,
    subject: "Your Catalogue Download Code — Paralight",
    html: `
      <div style="font-family:Arial,sans-serif;max-width:520px;margin:0 auto;color:#1C1410">
        <div style="background:#1a2332;padding:28px 32px;border-radius:12px 12px 0 0">
          <h1 style="color:#fff;font-size:22px;margin:0;letter-spacing:1px">PARALIGHT</h1>
        </div>
        <div style="background:#f9f6f0;padding:32px;border-radius:0 0 12px 12px;border:1px solid #e8dcc8;border-top:none">
          <p style="font-size:16px;margin-top:0">Hi <strong>${name}</strong>,</p>
          <p>Your download request for <strong>${catalogueName}</strong> has been approved.</p>
          <p>Use the code below on our Downloads page to access your catalogue:</p>
          <div style="background:#1a2332;border-radius:8px;padding:20px 32px;text-align:center;margin:24px 0">
            <span style="color:#ECAA00;font-size:32px;font-weight:bold;letter-spacing:8px;font-family:monospace">${code}</span>
          </div>
          <p style="font-size:13px;color:#8B6830">This code can only be used once. Visit <a href="https://paralight.cc/downloads" style="color:#00A8E8">paralight.cc/downloads</a> and enter it in the "Redeem Code" field.</p>
          <p style="color:#8B6830;font-size:13px;margin-top:32px">— The Paralight Team</p>
        </div>
      </div>
    `,
  });
}
