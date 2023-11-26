import { PrismaClient } from "@prisma/client";
// node tlg.t
export default async function handler(req:any, res:any) {
  const userMessage = req.body.message.text;
  const prisma = new PrismaClient()

  let isChatting = false;

  const character = prisma.character.findFirst({
    where: {
      name: userMessage.slice(1)
    }
  })
  const tgbot = "6038486194:AAFr5rQSfBRcWbDgggVxGi51JfDgKmvIYPo";
  async function fetchTextHelper(text:any) {
    const ret = await fetch(
      `https://api.telegram.org/bot${tgbot}/sendMessage?chat_id=${req.body.message.chat.id}&text=${text}&parse_mode=HTML`
    );
  }

  async function fetchPhotoHelper(imgSrc:any) {
    const ret = await fetch(
      `https://api.telegram.org/bot${tgbot}/sendPhoto?chat_id=${req.body.message.chat.id}&photo=${imgSrc}&parse_mode=HTML`
    );
  }

  async function chatWithOpenai(text:any, character:any) {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: text,
        context: JSON.stringify(character.message),
      }),
    };

    // const apiUrl = `${protocol}//${domain}:8000/api/chat`;

    const apiUrl = "http://localhost:3000/api/chat";
    const response = await fetch(apiUrl, requestOptions)
      .then((res) => res.json())
      .catch((err) => console.log(err));

    console.log(response);

    const data = {
      sender: "bot",
      text: response.answer.text,
    };

    return data;
  }

  if (req.body.message.text === "/start") {
    const message = `Welcome to Miaamor AI Telegram bot! <b>${req.body.message.from.first_name}</b> Connect with AI versions of your favorite influencers using realistic 2-way voice. Type '/' followed by the influencer's name, like /FirstName, and start conversing. Add credits to your account with the /deposit command. Thank you!`;
    const ret = await fetchTextHelper(message);
  } else if (character) {
    isChatting = true;
    const characterMessage = (character as any)?.message;
    await fetchTextHelper(characterMessage);
    const characterImage = (character as any)?.image;
    await fetchPhotoHelper(characterImage);
    if (!userMessage.includes("/")) {
      const answer = await chatWithOpenai(userMessage, character);
      console.log(answer);
    }
  } else {
    const message =
      "That's not a valid command. To select a companion, you need to type / + the name of the AI you want to speak to. For example: '/Stacey' . You can also check menu button down below for all available commands.";
    const answer = await chatWithOpenai(userMessage, character);
    console.log(answer);
    const ret = await fetchTextHelper(message);
  }

  if (req.body.message.text === "/help") {
    const message =
      "Help for <i>NextJS News Channel</i>.%0AUse /search <i>keyword</i> to search for <i>keyword</i> in my Medium publication";
    const ret = await fetchTextHelper(message);
  }

  res.status(200).send("OK");
}












//import bot from '../telegrambot'
// import { PrismaClient } from "@prisma/client";
// const bot = require('../telegrambot')
// const prisma = new PrismaClient();
// bot.stopPolling();
// bot.api.sendMessage(504910259, 'Hello!')

// bot.on('message', async (msg:any) => {
//     // msg = "hello"
//   // Save user to database
//  // await prisma.user.create({ ... })
  
//  console.log(msg.text)
//     // await prisma.user.create({
//     //     data: { 
//     //         telegramId: chatId 
//     //     } 
//     // })
// });

//import bot from '../telegrambot'

// export default async (req:any, res:any) => {
  
//   //const chatId = String(process.env.TELEGRAM_BOT_CHAT_ID)
  
//   await bot.api.sendMessage(504910259, 'This is a test message')
  
//   res.status(200).json({ msg: 'Message sent!' })
// }