import nodemailer from "nodemailer";
import path, { join } from "path";
import ejs from "ejs";

const sendMail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMPT_HOST,
    port: process.env.SMPT_PORT,
    service: process.env.SMPT_SERVISE,
    auth: {
      user: process.env.SMPT_USER,
      pass: process.env.SMPT_PASSWORD,
    },
  });

  const { email, subject, template, data } = options;

  const templatePath = path.join(__dirname, "../mails", template);

  const html = await ejs.renderFile(templatePath, data);

  const mailOptions = {
    from: process.env.SMTP_MAIL,
    to: email,
    subject,
    html,
  };

  await transporter.sendMail(mailOptions);

  module.exports = sendMail;

};
