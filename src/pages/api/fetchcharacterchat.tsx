import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handle(req:any, res:any) {
    const { method } = req;

    switch (method) {
        case 'GET':
            const query = req.query;
            const { userId, characterId } = query;
            try {
            const data = await prisma.characterChat.findMany(
                {
                    where: {
                        userId: userId,
                        characterId: parseInt(characterId)
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