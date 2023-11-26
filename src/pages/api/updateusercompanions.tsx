import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function updateUserCompanions(req:any, res:any) {
    // const { method } = req;

    // switch (method) {
    //     case 'UPDATE':
    //         const { userId, characterId } = req.body;
    //         // console.log("sandy", ass);
    //         const data = await prisma.userCharacter.updateMany({
    //             data: {
    //                 status: !false,
    //                 userId: userId, 
    //                 characterId: characterId
    //             },
    //         })
    //         res.status(201).json(data);
    //         break;
    //     default:
    //         res.status(405).end(`Method ${method} Not Allowed`)
    // }
}