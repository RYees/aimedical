/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck

// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const messagingSID = process.env.TWILIO_MESSAGING_SERVICE_SID;
//const client = require('twilio')("AC502749bf769a8f673db2bd88da2f2386", "a4b8609ed5409a1e5d133cf27c432ca6");

import { useState, useEffect } from "react";
import { PrismaClient } from "@prisma/client";
import { CronJob } from "cron";
import Home from './home';
import { useSession } from 'next-auth/react'
import { useRouter } from "next/router";


function Page(props) {
  //const character = props?.character[0];
  //const favourite = props?.favourite;
  
  const router = useRouter();
  const { data: session, status } = useSession();
  const user = session?.user;

  // useEffect(() => {
  //   if (!user) {
  //     router.push("/");
  //   }
  // }, []); // Run the effect only once on component mount


 
  return (
    <>
      <div className=" ">
          <Home/>
      </div>
    </>
  );
}

export default Page;

import { telegram } from './utils/teleg';

const getString = (dayOfWeek:any) => {
  if(dayOfWeek == 0) return "S";
  if(dayOfWeek == 1) return "M";
  if(dayOfWeek == 2) return "T";
  if(dayOfWeek == 3) return "W";
  if(dayOfWeek == 4) return "Th";
  if(dayOfWeek == 5) return "F";
  return "Sa";
}



import nodemailer, {SendMailOptions} from 'nodemailer';
import { getSession } from 'next-auth/react';
import { GetSessionParams } from 'next-auth';

export const getServerSideProps = async (context: GetSessionParams) => {
  const prisma = new PrismaClient();
  const data = await prisma.character.findMany();
  const chatId = 504910259; // get from context
  const session = await getSession(context ?? undefined);
  const user = session?.user;

  const job = new CronJob('* * * * *', async () => {
    const character = data[0];
    try {
      const date = new Date();
      const dayOfWeek = date.getDay();
      const searchString = getString(dayOfWeek);

      let hours = date.getHours();
      let minute = date.getMinutes();
      if (minute < 10) {
        minute = `0${minute}`;
      }
      if (hours < 10) {
        hours = `0${hours}`;
      }
      const timevalue = [];
      timevalue.push(hours);
      timevalue.push(minute);
      let currentime = timevalue.join(':');
      currentime = currentime.toString();

      const reminderData = await prisma.reminder.findMany({
        where: {
          timeArray: {
            has: currentime,
          },
          days: {
            contains: searchString,
            mode: 'insensitive',
          },
        },
      });
      
      const messagingData = reminderData
        .filter((element) => element.opted)
        .map((element) => {
          const message = `Hello "${element.fullname ?? ''}",

          This is "${character?.name ?? ''}", an AI language model developed by OpenAI. I hope you're having a great day. I'm here to provide you with a medication reminder based on the data you've set in our database.
          
          According to the medication reminder you've set, it's time for you to take your medication. The details of the medication are as follows:
          
          Medicine Name: "${element?.medicinename ?? ''}"
          Dosage: "${element?.dosage ?? ''}"
          Please make sure to take the prescribed dosage for your "${element?.description ?? ''}".

          Thank you, and have a wonderful day!`;

          return {
            fullname: element?.fullname,
            number: element?.phoneNumber,
            message: message,
          };
        });
       
        // If email is choosen
        if(reminderData.type === 'email'){
            messagingData.forEach((data: any) => {
              const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: 'toygame8888@gmail.com',
                  pass: 'zzby hbwo jkpj ccjq',
                },
              });

              async function sendEmail(options: SendMailOptions) {
                try {
                  await transporter.sendMail(options);
                  console.log('Email sent successfully');
                } catch (error) {
                  console.error('Error sending email:', error);
                }
              }

              const emailOptions = {
                from: 'toygame8888@gmail.com',
                to: user.email,
                subject: 'Medication Notification',
                text: data.message,
              };

              sendEmail(emailOptions);
            });
          }
          // If whatsapp or sms is choosen
          else if(reminderData.type === 'sms' || reminderData.type === 'whatsapp'){
            Promise.all(
              MessagingData.map((data:any) => {
                  return client.messages.create({
                      to: "+251922147859",
                      from: "+14782102780",
                      body: "testing message"
                  });
              })
            )
          }
        // If sms is choosen

    } catch (error) {
      console.log('error', error);
    }
  });

  // Uncomment the line below if you want to start the CronJob
  job.start();

  return {
    props: {
      character: JSON.parse(JSON.stringify(data)),
      //favourite: JSON.parse(JSON.stringify(userfav)),
    },
  };
};



