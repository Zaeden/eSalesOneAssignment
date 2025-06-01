import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST,
  port: Number(process.env.MAILTRAP_PORT),
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
});

export const sendConfirmationEmail = async (
  to: string,
  subject: string,
  html: string
) => {
  await transporter.sendMail({
    from: process.env.MAILTRAP_FROM,
    to,
    subject,
    html,
  });
};
