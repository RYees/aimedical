import cron from 'node-cron'
import {prisma} from './prisma'

cron.schedule('* * * * *', async () => {
  await prisma.$connect()
  // Do your scheduled task here
  
  await prisma.$disconnect() 
})