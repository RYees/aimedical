// api/update-health-data.js

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req:any, res:any) {
  try {
    // Update the specified field in the health tracking table
    const query = req.query;
     const { id } = query;
    const userreminders = await prisma.user.findUnique(
      {
          where: {
              id: id,
          },
          select: {
              reminders: true
          },
      }
    );
    res.status(200).json(userreminders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update health data.' });
  }
}