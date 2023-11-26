import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const TelegramAPI = require("node-telegram-bot-api");
const token = "6428214975:AAGCN6RewTMJ7sNCA2bFqAgTaPmr2FTb3hU";

export default async function handler(req, res) {

    const bot = new TelegramAPI(token, { polling: true });
    
    const MENU_LIST = [
        {
          name: "Register"
        },
    ];
      
    let selectedMenu;

    const menuOptions = {
        reply_markup: JSON.stringify({
          inline_keyboard: MENU_LIST.map((menu) => {
            return [
              {
                text: menu.name,
                callback_data: menu.name,
              },
            ];
          }),
        }),
      };
    
      function getObjectByName(name) {
        return MENU_LIST.find((menu) => menu.name === name);
      }

    bot.setMyCommands([
      { command: "/join", description: "To start recieving reminder, you need to join the telegram bot" },
      { command: "/register", description: "To start recieving reminder, you need to put your email address" },
      { command: "/help", description: "To get any help" },
    ]);
    
    function start() {
      bot.on("message", async (msg) => {
        const text = msg.text;
        const chatId = msg.chat.id;
        if (text.toLowerCase() === "/join") {
            const exist = await prisma.userTelegram.findFirst({
                where:{ chatId: chatId}
            });  
            console.log("marrym", exist)
             if(exist === null){
                const data = await prisma.userTelegram.create({
                    data: {
                        chatId,
                        //userId           
                    },
                });
             }
            return await bot.sendMessage(
                chatId,
                `Welcome to Miaamor AI ${msg.chat.first_name}! to start reciveing reminder for your set time, you first need to put your email address you used to register for the reminder, you can register under /register!`
            );
        }

        if (text.toLowerCase() === "/register") {
            return await bot.sendMessage(
              chatId,
              "Please send your email address to register!",
              menuOptions
            );
          }
        });

        function chat(selectedMenu) {
            bot.on("message", async (msg) => {
              const email = msg.text;
              const chatId = msg.chat.id;
              const answer = `registeration is successfull`;
              bot.sendMessage(chatId, answer);
            
            if(msg.text){
            const exist = await prisma.user.findUnique({
                where:{ email: email}
            });  
            console.log("users", exist)
        }
            //  if(exist === null){
            //     const data = await prisma.userTelegram.create({
            //         data: {
            //             chatId,
            //             //userId           
            //         },
            //     });
            //  }

            });
          }
        
          bot.on("callback_query", async (msg) => {
            const data = msg.data;
            const chatId = msg.message.chat.id;
            selectedMenu = getObjectByName(data);
            chat(selectedMenu);
            bot.sendMessage(chatId, selectedMenu);
          });
    
    }
     
    try {
        await start();
        res.status(200).json({ message: 'Bot started' });
    }catch(err){
        console.error(err);
        res.status(500).json({ message: 'Error starting bot' });
    }
}