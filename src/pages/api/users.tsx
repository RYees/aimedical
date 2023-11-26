import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function createUser(req:any, res:any) {
    const { method } = req;

    switch (method) {
        case 'POST':
            const { id, email, name } = req.body;
            const data = await prisma.user.create({
                data: {
                    name,
                    email
                    // 'emailVerified', 
                    // "image",           
                    // "type"           
                    
                  },
            })
            res.status(201).json(data);
            break;
        default:
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}