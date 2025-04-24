import { PrismaClient } from "@prisma/client";
import { ILoginUser } from "./auth.interface";
import ApiError from "../../errors/AppError";
import { AuthUtils } from "./auth.utils";
import { jwtHelpers } from "../../helpers/jwtHelpers";
import config from "../../config";
const prisma = new PrismaClient();

const loginUser = async (data: ILoginUser) => {
  const isUserExist = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (!isUserExist) {
    throw new ApiError(400, "User does not exist");
  }

  const isPasswordMatched = await AuthUtils.comparePasswords(
    data.password,
    isUserExist.password
  );

  if (!isPasswordMatched) {
    throw new ApiError(400, "Password does not match");
  }

  const accessToken = jwtHelpers.createToken(
    {
      id: isUserExist.id,
      email: isUserExist.email,
    },
    config.jwt.secret as string,
    Number(86400)
  );

  const refreshToken = jwtHelpers.createToken(
    {
      id: isUserExist.id,
      email: isUserExist.email,
    },
    config.jwt.refresh_secret as string,
    Number(604800)
  );

  return { accessToken, refreshToken };
};

const refreshToken = async (token: string) => {
  let decodedData: any;
  try {
    decodedData = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as string
    );
  } catch (error) {
    throw new ApiError(400, "Invalid refresh token");
  }

  const isUserExist = await prisma.user.findUnique({
    where: {
      email: decodedData.email,
    },
  });

  if (!isUserExist) {
    throw new ApiError(400, "User does not exist");
  }

  const accessToken = jwtHelpers.createToken(
    {
      id: isUserExist.id,
      email: isUserExist.email,
    },
    config.jwt.secret as string,
    Number(86400)
  );

  return { accessToken };
};

export const AuthServices = { loginUser, refreshToken };
