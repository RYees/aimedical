import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function fetchuser(req:any, res:any) {
    const { method } = req;

    switch (method) {
        case 'GET':
            const query = req.query;
            const { userId } = query;
            const data = await prisma.user.findUnique(
                {
                    where: {
                        id: userId,
                    },
                    include: {
                        healthtracking: true,
                        reminders: true,
                        characters: {
                            include: {
                                character: true
                            }
                        }
                    },
                }
            )
            res.status(201).json(data);
            break;
        default:
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}