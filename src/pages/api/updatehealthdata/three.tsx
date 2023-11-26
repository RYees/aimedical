// api/update-health-data.js

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req:any, res:any) {
  const { 
    healthId, 
    glucose,
    cholesterol,
    hemoglobin,
    carbohydrate,
    protiens,
    fats,
    ecg,
    vitamins,
    minerals } = req.body;
  console.log("fleabag", req.body)
  
  try {
    // Update the specified field in the health tracking table
    await prisma.healthTracking.update({
      where: { id: healthId }, // Assuming you have user authentication and the user ID is available in req.user.id
      data: {
        glucose: glucose,
        cholesterol: cholesterol,
        hemoglobin: hemoglobin,
        carbohydrate: carbohydrate,
        protiens: protiens,
        fats: fats,
        ecg: ecg,
        vitamins: vitamins,
        minerals: minerals ,
      },
    });

    res.status(200).json({ message: 'Health data updated successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update health data.' });
  }
}