import React from 'react'

const teleg = () => {
  return (
    <div>teleg</div>
  )
}

export default teleg

// const TelegramAPI= require("node-telegram-bot-api");

// const bot = new TelegramAPI("6428214975:AAGCN6RewTMJ7sNCA2bFqAgTaPmr2FTb3hU");

// // async function sendMessage(chatId, text) {
// //   await bot.sendMessage(chatId, text);
// // }
// // sendMessage(504910259, 'Hello from rehmet!');

// // Get bot details

// // Pass bot id as userId 
// // const user = await bot.getChatMember(chatId, botInfo.id);

// // export const telegram = {
// //     getChatMember: (chatId) => bot.getChatMember(chatId, botInfo.id) 
// // }

// export const telegram = {
//   async getChatMember(chatId:any, userId:any) {
//     return bot.getChatMember(chatId, userId);
//   }
// }

// let chatId = 504910259;
// const botInfo = await bot.getMe();
// console.log("botid", botInfo);
// const user = await telegram.getChatMember(chatId, botInfo.id);
// console.log("derek", user);
