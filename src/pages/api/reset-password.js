import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export default async function handle(req, res) {
  const { token, password } = req.body;
    try {
        // Hash the password if it's not null
        const hashedPassword = password ? await bcrypt.hash(password, 10) : null;

        // Find the user with the provided token
        const user = await prisma.user.findFirst({
          where: {
            resetPasswordToken: token,
            resetPasswordExpires: {
              gt: Date.now(), // Check if the token has not expired
            },
          },
        });

        if (!user) {
          return res.status(400).json({ message: "Invalid or expired token." });
        }

        // Update the user's password and clear the reset token and expiry time
        const response  = await prisma.user.update({
          where: { id: user.id },
          data: {
            password: hashedPassword, // You should hash the password before storing it
            resetPasswordToken: null,
            resetPasswordExpires: null,
          },
        });
        
        res.json({ message: "Password reset successful." });
    }  catch (error) {
        console.error('Error exchanging authorization code for access token:', error);
    }
}
