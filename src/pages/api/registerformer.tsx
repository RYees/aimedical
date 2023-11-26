import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
// import bcrypt from 'bcrypt'
import { NextResponse } from 'next/server'

export default async function createUser(req:any, res:any) {
    // const { method } = req;

    // switch (method) {
    //     case 'POST':
    //         const { email, password, name } = req.body;
            
    //         if(!name || !email || !password) {
    //             return new NextResponse('Missing Fields', { status: 400 })
    //         }

    //         const exist = await prisma.user.findUnique({
    //             where: {
    //                 email
    //             }
    //         });

    //         if(exist) {
    //             throw new Error('Email already exists')
    //         }

    //         const hashedPassword = await bcrypt.hash(password, 10);

    //         const data = await prisma.user.create({
    //             data: {
    //                // id,
    //                 email,
    //                 password: hashedPassword,
    //                 name
    //               },
    //         })
    //         res.status(201).json(data);
    //         break;
    //     default:
    //         res.status(405).end(`Method ${method} Not Allowed`)
    // }
}