// const nodemailer = require("nodemailer");
// const dotenv = require("dotenv");
// const sendgridTransport = require("nodemailer-sendgrid-transport");
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import sendgridTransport from "nodemailer-sendgrid-transport";

dotenv.config({ path: "./src/config/config.env" });
const { createTransport } = nodemailer;

const sendMail = async (email, subject, text) => {
  const transport = createTransport(
    sendgridTransport({
      auth: {
        api_key: process.env.NODEMAILER_API_KEY,
      },
    })
  );
  await transport.sendMail({
    from: "insightmeter@gmail.com",
    to: email,
    subject,
    text,
  });
};

export default sendMail;
