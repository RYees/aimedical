import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export default async function deletereminder(req:any, res:any) {
    const { method } = req;

    switch (method) {
        case 'DELETE':
            const query = req.query;
            const { id } = query;
            const data = await prisma.reminder.deleteMany(
                {
                    where: {
                        id: parseInt(id),
                    },
                }
            )
           
            res.status(201).json(data);
            break;
        default:
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}