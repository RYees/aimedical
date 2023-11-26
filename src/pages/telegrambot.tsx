import React from 'react'

const telegrambot = () => {
  return (
    <div>telegrambot</div>
  )
}

export default telegrambot

// //import TelegramBot from 'node-telegram-bot-api'
// //const TelegramBot = require('telegram-node-bot')
// const TelegramAPI= require("node-telegram-bot-api");

// //const bot = new TelegramBot("6428214975:AAGCN6RewTMJ7sNCA2bFqAgTaPmr2FTb3hU")
// //const bot = new TelegramBot("6428214975:AAGCN6RewTMJ7sNCA2bFqAgTaPmr2FTb3hU", { polling: true })
// const bot = new TelegramAPI("6428214975:AAGCN6RewTMJ7sNCA2bFqAgTaPmr2FTb3hU", { polling: true });
// // bot.on('message', () => {
// //   // Handle message
// // })
// async function sendMessage(chatId:any, text:any) {
//   await bot.sendMessage(chatId, text);
// }
// sendMessage(504910259, '😁!');

// //module.exports = bot;


// //const TelegramBot = require("telegram-node-bot");

// // const bot = new TelegramBot(process.env.TELEGRAM_TOKEN)
// // // Call webhook

// //bot.setWebHook('https://localhost:3000/api/telegram')

// //export default bot