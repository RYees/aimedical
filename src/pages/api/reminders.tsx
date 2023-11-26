import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function createReminder(req:any, res:any) {
    const { method } = req;

    switch (method) {
        case 'POST':
            const { userId, type, fullname, phoneNumber, medicinename, dosage, days, age, opted, startDate, endDate, reason, description, timeArray 
                //date, time
            } = req.body;
            const data = await prisma.reminder.create({
                data: {
                    userId,                              
                    medicinename,    
                    dosage,           
                    days,            
                    description,     
                    age,             
                    phoneNumber,     
                    type,              
                    timeArray,   
                    fullname,     
                    opted,
                    startDate,
                    endDate           
                  },
            })
            res.status(201).json(data);
            break;
        default:
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}