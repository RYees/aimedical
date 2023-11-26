import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export default async function updateReminder(req:any, res:any) {
    const { method } = req;

    switch (method) {
        case 'POST':
            const query = req.query;
            const { id } = query;
            const { userId, type , phoneNumber,medicinename, dosage, days, age, opted, description, timeArray } = req.body;
            const data = await prisma.reminder.updateMany({
                where: {
                    id: parseInt(id)
                },
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
                    opted  
                },
            })
            res.status(201).json(data);
            const dat = JSON.stringify(data);
            console.log("suces", dat);
            //return NextResponse.json(dat);
            break;
        default:
            res.status(405).end(`Method ${method} Not Allowed`)
            // return NextResponse.error(
            //     "An error occurred while processing the request."
            //   );
    }
}