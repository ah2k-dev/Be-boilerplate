declare module 'nodemailer-sendgrid-transport' {
    import { TransportOptions, Transporter } from 'nodemailer';
  
    interface SendGridTransportOptions extends TransportOptions {
      auth: {
        api_key: string;
      };
    }
  
    function sendgridTransport(options: SendGridTransportOptions): Transporter;
  
    export default sendgridTransport;
  }
  