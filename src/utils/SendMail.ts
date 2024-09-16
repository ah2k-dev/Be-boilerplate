import nodemailer, { Transporter, SendMailOptions } from 'nodemailer';
import dotenv from 'dotenv';
import sendgridTransport from 'nodemailer-sendgrid-transport';
import { SendMailParams } from '../types/generalTypes'; // Adjust the import path as needed

dotenv.config({ path: './src/config/config.env' });

const { createTransport } = nodemailer;

const SendMail = async ({ email, subject, text }: SendMailParams): Promise<void> => {
  const transport: Transporter = createTransport(
    sendgridTransport({
      auth: {
        api_key: process.env.NODEMAILER_API_KEY as string,
      },
    })
  );

  const mailOptions: SendMailOptions = {
    from: 'ah2k.dev@gmail.com',
    to: email,
    subject,
    text,
  };

  await transport.sendMail(mailOptions);
};

export default SendMail;
