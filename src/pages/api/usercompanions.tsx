import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function userCompanions(req:any, res:any) {
    // const { method } = req;

    // switch (method) {
    //     case 'POST':
    //         const { userId, characterId } = req.body;
    //         // console.log("sandy", ass);
    //         const data = await prisma.userCharacter.create({
    //             data: {
    //                 status: true,
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