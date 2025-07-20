import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  // Configure your email service here
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendOTP(email: string, otp: string) {
  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: email,
    subject: 'Your Login Code for Void Chat',
    text: `Your verification code is: ${otp}. This code will expire in 15 minutes.`,
    html: `
      <h1>Your Verification Code</h1>
      <p>Use this code to login to Void Chat:</p>
      <h2 style="font-size: 2em; padding: 20px; background: #f5f5f5; text-align: center;">${otp}</h2>
      <p>This code will expire in 15 minutes.</p>
    `,
  });
}