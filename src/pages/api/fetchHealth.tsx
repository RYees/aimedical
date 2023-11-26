import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handle(req:any, res:any) {
    const { method } = req;

    switch (method) {
        case 'GET':
            const query = req.query;
            const { id } = query;
            try {
            const data = await prisma.user.findMany(
                {
                    where: {
                        id: id,
                    },
                    include: {
                        healthtracking: true,
                    },
                }
            )
            res.status(201).json(data);
            } catch(error){
                console.log("error", error)
            }
            break;
        default:
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}