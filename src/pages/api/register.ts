import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, Prisma } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password } = req.body;

  // Hash the password if it's not null
  const hashedPassword = password ? await bcrypt.hash(password, 10) : null;

  try {
    // Store the new user in the database
    const user = await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
        image: 'https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI='
      },
    });

    res.json({ success: true, user });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      // This error occurs when a unique constraint is violated, i.e., the email already exists
      res
        .status(400)
        .json({
          success: false,
          error: "A user with this email already exists.",
        });
    } else {
      // Other unknown errors
      res
        .status(500)
        .json({
          success: false,
          error: "An error occurred while creating the user.",
        });
    }
  }
}
