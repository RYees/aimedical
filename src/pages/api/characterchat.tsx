import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function saveChatid(req: any, res: any) {
  const { method } = req;

  switch (method) {
    case "POST":
        const requestinputs = req.body;

        const savedMessages = [];
  
        for (const input of requestinputs) {
          const { chatid, role, content, userId, characterId } = input;

        const existingMessage = await prisma.characterChat.findFirst({
          where: {
            chatid: chatid,
          },
        });

        if (!existingMessage || chatid === "") {
          const data = await prisma.characterChat.create({
            data: {
              chatid,
              role,
              content,
              userId,
              characterId,
            },
          });

          savedMessages.push(data);
        }
      }

      return res.status(201).json(savedMessages);
    default:
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}