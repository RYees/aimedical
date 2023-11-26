import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export default async function deleteusercompanion(req:any, res:any) {
    const { method } = req;

    switch (method) {
        case 'DELETE':
            const query = req.query;
            const { id } = query;
            const data = await prisma.userCharacter.deleteMany(
                {
                    where: {
                        characterId: parseInt(id),
                        userId: '0907474a-8430-492f-8856-477fc2ace172'
                    },
                }
            )
            
            // if (typeof window !== 'undefined') {
            //     window.location.reload();
            // }
            
            res.status(201).json(data);
            break;
        default:
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}