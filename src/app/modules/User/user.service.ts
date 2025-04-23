import { PrismaClient } from "@prisma/client";
import { hashedPassword } from "../../helpers/hashPassword";
const prisma = new PrismaClient();

const registerUser = async (data: any) => {
  const encryptedPassword = await hashedPassword(data.password);
  const userData = { ...data, password: encryptedPassword };

  const result = await prisma.user.create({ data: userData });

  const { password, ...rest } = result;

  return rest;
};

export const UserService = {
  registerUser,
};
