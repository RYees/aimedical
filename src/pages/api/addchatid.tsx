import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function saveChatid(req:any, res:any) {
    const { method } = req;

    switch (method) {
        case 'POST':
            // const { chatId } = req.body;
            // const data = await prisma.userstelegram.create({
            //     data: {
            //         chatId,
            //         //userId           
            //       },
            // })
            // res.status(201).json(data);
            break;
        default:
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}