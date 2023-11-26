import React from 'react';
import axios from 'axios';
//import nodemailer from 'nodemailer';

//const sendEmail = async () => {
  // Create a Nodemailer transporter
//   const transporter = nodemailer.createTransport({
//     service: 'Gmail',
//     auth: {
//       user: 'your-email@gmail.com',
//       pass: 'your-password',
//     },
//   });

//   // Define email options
//   const mailOptions = {
//     from: 'toygame8888@gmail.com',
//     to: 'ryfgmz87@gmail.com',
//     subject: 'Hello rehmet from Nodemailer',
//     text: 'This is the content of the email.',
//   };

//   // Send the email
//   const info = await transporter.sendMail(mailOptions);
//   console.log('Email sent:', info.messageId);
// };

const EmailButton = () => {
  
    const sendEmail = async() => {
      try{
        const response = await axios.post('http://localhost:3000/api/nodemailer');
        console.log("working now", response)
      } catch(error){
        console.log("taylor", error)
      }
    }
  return (
    <div>
      <button onClick={()=>sendEmail}>Send Email</button>
    </div>
  );
};

const Mail = () => {
  return (
    <div>
      <h1>My Component</h1>
      <EmailButton />
    </div>
  );
};

export default Mail;