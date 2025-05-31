// utils/sendMail.js
import nodemailer from "nodemailer"


const sendMail = async ({ to, subject, html }) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,  // Your Gmail or custom SMTP user
      pass: process.env.MAIL_PASS   // App password or real password (use env)
    }
  });

  const mailOptions = {
    from: process.env.MAIL_USER,
    to,
    subject,
    html,
  };

  await transporter.sendMail(mailOptions);
};

export {sendMail}
