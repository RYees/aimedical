//require('dotenv').config()
// const User = require("../models/user");
import { PrismaClient } from "@prisma/client";

// const accountSid = 'AC88e157b6b41cb9dbdf84099c5b081214';
// const authToken = 'a578be3da13f5e38a8a96d8e70837cf5';
// const messagingSID = process.env.TWILIO_MESSAGING_SERVICE_SID;
// const client = require('twilio')(accountSid, authToken);

// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const messagingSID = process.env.TWILIO_MESSAGING_SERVICE_SID;
// const client = require('twilio')(accountSid, authToken);

const prisma = new PrismaClient();

const getString = (dayOfWeek:any) => {
    if(dayOfWeek == 0) return "S";
    if(dayOfWeek == 1) return "M";
    if(dayOfWeek == 2) return "T";
    if(dayOfWeek == 3) return "W";
    if(dayOfWeek == 4) return "Th";
    if(dayOfWeek == 5) return "F";
    return "Sa";
}

export default async function UserNotification(req:any, res:any) {

//     try {
//         // if (req.query.key !== 'sharedKey') {
//         //     res.status(404).end();
//         //     return;
//         // }
//     const date = new Date();
//     const hours = date.getHours();
//     const minute = date.getMinutes();
//     let timevalue = [];
//     timevalue.push(hours);
//     timevalue.push(minute);
//     let currentime = timevalue.join(':');
//     currentime = currentime.toString();
//     console.log("time", date, hours, minute, currentime);

//     const dayOfWeek = date.getDay();
//     const searchString = getString(dayOfWeek)
//     console.log("day", searchString);
  
//     const response = await prisma.reminder.findMany({  
      
//       where: {
//           time: {
//             has: currentime 
//            },
//           days: {
//               contains: searchString,
//               mode: 'insensitive'
//             },
          

//         //   time: {
//         //     contains: currentime 
//         //   }
//       },  
  
//     })
//     .then(data => {  
//         console.log("data", data);
//         const MessagingData = data.map(element => {
//             if(element.opted == true){
//                 const message = `Hello user. We hope you are doing well. Here is your reminder for medicine intake. You have to take Medicine Name : "${element.medicinename}" with Dosage : "${element.dosage}". Thank You, Have A great Day.`;
//                 return {
//                     number : element.phoneNumber , 
//                     message : message
//                 };
//             }
//         })
    
//         console.log("Message", MessagingData);
    
//         // Promise.all(
//         //     MessagingData.map((data:any) => {
//         //         return client.messages.create({
//         //             to: "+251922147859",
//         //             from: "+14782102780",
//         //             body: "testing message"
//         //         });
//         //     })
//         // )
//         // .then(messages => {
//         //     console.log("Messages Sent");
//         //     prisma.notificationMessage.create({  
//         //         data: {
//         //              messageId: messagingSID, 
//         //             //  smsId:
//         //              accountId: accountSid,
//         //              serviceId: authToken,
//         //              From: data.phoneNumber,
//         //              To: messagingSID,
//         //              Body: data.message
//         //         }
//         //     })
//         // })
//         // .catch(err => console.error(err));
//     })
//     .catch(err => {
//         console.log(err);
//     })
// } catch(error) {
//     console.log("error", error);
// }
}

