// import Mailgun from 'mailgun-js';
// import FormData from 'form-data';

// export default async function handler(req:any, res:any) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ message: 'Method Not Allowed' });
//   }

//   const API_KEY = 'YOUR_API_KEY';
//   const DOMAIN = 'YOUR_DOMAIN_NAME';
 
  
//   const mailgun = new Mailgun(FormData);
//   const client = mailgun.client({username: 'api', key: API_KEY});
  
//   const messageData = {
//     from: 'Excited User <me@samples.mailgun.org>',
//     to: 'foo@example.com, bar@example.com',
//     subject: 'Hello',
//     text: 'Testing some Mailgun awesomeness!'
//   };
  
//   client.messages.create(DOMAIN, messageData)
//    .then((res) => {
//      console.log(res);
//    })
//    .catch((err) => {
//      console.error(err);
//    });
// } zzby hbwo jkpj ccjq

import nodemailer from 'nodemailer';

// Create a transporter using Gmail's SMTP settings
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'toygame8888@gmail.com',
    pass: 'zzby hbwo jkpj ccjq',
  },
});

// Function to send an email
async function sendEmail(options:any) {
  try {
    await transporter.sendMail(options);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

// Usage example
const emailOptions = {
  from: 'toygame8888@gmail.com',
  to: 'ryfgmz87@gmail.com',
  subject: 'Yay Robert',
  text: 'The job is not a flee market: 3',
};

sendEmail(emailOptions);