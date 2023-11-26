import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handle(req, res) {
  const { email, token } = req.body;

  // Update the user's data
  const update =await prisma.user.update({
    where: { email: email },
    data: {
      resetPasswordToken: token,
      resetPasswordExpires: Date.now() + 3600000, // Token expires after 1 hour
    },
  });
  console.log("mouvering", update)

  res.json({ message: "Password reset token sent." });
}
