//require('dotenv').config()
// const User = require("../models/user");
import { PrismaClient } from "@prisma/client";

// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const messagingSID = process.env.TWILIO_MESSAGING_SERVICE_SID;
// const client = require('twilio')(accountSid, authToken);

const getString = (dayOfWeek:any) => {
    if(dayOfWeek == 0) return "S";
    if(dayOfWeek == 1) return "M";
    if(dayOfWeek == 2) return "T";
    if(dayOfWeek == 3) return "W";
    if(dayOfWeek == 4) return "Th";
    if(dayOfWeek == 5) return "F";
    return "Sa";
}

export async function UserNotification() {
    const prisma = new PrismaClient();
    const date = new Date();
    const dayOfWeek = date.getDay();
    const searchString = getString(dayOfWeek)
    console.log("sports", searchString);
    // User
    // .find
    const zeto = await prisma.reminder.findMany({  
        where: {
            days: {
                equals: "WThF",
                mode: 'insensitive'
            }
            //days: {$regex : searchString}
        },  
        //"days" : {$regex : searchString}
    })
    // .then(data => {
    //     return data;
    // })

    const servingData = zeto.map(element => {
        if(element.opted == true){
            //const medicines = element.medicines.map(medicine => {
                // const medicines = () => { 
                //     if(element.days.includes(searchString))
                //         return `Medicine Name : "${element.medicinename}" with Dosage : "${element.dosage}"`
                // }
            //})
            //const medicineString = medicines.join(', ')
            const message = `Hello user. We hope you are doing well. Here is your reminder for medicine intake. You have to take Medicine Name : "${element.medicinename}" with Dosage : "${element.dosage}". Thank You, Have A great Day.`;
            //console.log("MeSent", message);
            return {number : element.phoneNumber , message : message};
        }
    })
    console.log("Messages Sent", servingData);

    // .then(data => {
    //     const servingData = data.map(element => {
    //         if(element.opted == true){
    //             //const medicines = element.medicines.map(medicine => {
    //                 // const medicines = () => { 
    //                 //     if(element.days.includes(searchString))
    //                 //         return `Medicine Name : "${element.medicinename}" with Dosage : "${element.dosage}"`
    //                 // }
    //             //})
    //             //const medicineString = medicines.join(', ')
    //             const message = `Hello user. We hope you are doing well. Here is your reminder for medicine intake. You have to take Medicine Name : "${element.medicinename}" with Dosage : "${element.dosage}". Thank You, Have A great Day.`;
    //             return {number : element.phoneNumber , message : message};
    //         }
    //     })
    //     console.log("Messages Sent", servingData);
    //     Promise.all(
    //         servingData.map((data:any) => {
    //             return client.messages.create({
    //                 to: data.number,
    //                 from: messagingSID,
    //                 body: data.message
    //             });
    //         })
    //     )
    //     .then(messages => {
    //         console.log("Messages Sent");
    //     })
    //     .catch(err => console.error(err));
    // })
    // .catch(err => {
    //     console.log(err);
    // })
}

