import { PrismaClient } from "@prisma/client";
import { hashedPassword } from "../../helpers/hashPassword";
import { IUserRegistration } from "./user.interface";
import ApiError from "../../errors/AppError";
const prisma = new PrismaClient();

const registerUser = async (data: IUserRegistration) => {
  const isUserExist = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (isUserExist) {
    throw new ApiError(400, "User already exist");
  }

  const encryptedPassword = await hashedPassword(data.password);
  const userData = { ...data, password: encryptedPassword };

  const result = await prisma.user.create({ data: userData });

  const { password, ...rest } = result;

  return rest;
};

export const UserService = {
  registerUser,
};
