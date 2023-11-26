import axios from "axios";
import nodemailer, {SendMailOptions} from 'nodemailer';

export default async function handler(req:any, res:any) {

    try {

        const {email, url} = req.body;
        console.log("req.body", req.body)

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'toygame8888@gmail.com',
              pass: 'zzby hbwo jkpj ccjq',
            },
          });
    
          async function sendEmail(options: SendMailOptions) {
            try {
              console.log('Email sent successfully');
              return await transporter.sendMail(options);              
            } catch (error) {
              console.error('Error sending email:', error);
            }
          }
    
          const message = `Hi,
    
    
          We've received a request to reset your password. Click the link below:
          
          ${url}
          
          If this wasn't you, just ignore. For concerns, reply to this email. Link is valid for 24 hours.
          
          Regards,
          Inchy Team`;
    
          const emailOptions = {
            from: 'toygame8888@gmail.com',
            to: email,
            subject: 'Password Reset for Miaamor',
            text: message,
          };
        
        sendEmail(emailOptions);
      
       
      // You can store the tokens in localStorage or state for later use
    } catch (error) {
      console.error('Error exchanging authorization code for access token:', error);
    }
}