import bcrypt from "bcrypt";
import { prisma } from "./db.js";

export async function seedAdmin() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    return;
  }

  const existing = await prisma.unique_user.findUnique({
    where: { email },
  });

  if (existing) {
    return;
  }

  await prisma.unique_user.create({
    data: {
      name: process.env.ADMIN_NAME || "Admin",
      lastname: process.env.ADMIN_LASTNAME || "Artist",
      email,
      password: await bcrypt.hash(password, 10),
    },
  });

  console.log(`Usuário admin criado: ${email}`);
}
