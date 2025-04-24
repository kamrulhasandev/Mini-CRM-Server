import { PrismaClient } from "@prisma/client";
import { ICreateLog } from "./logs.interface";
import ApiError from "../../errors/AppError";
const prisma = new PrismaClient();

const createLog = async (data: ICreateLog, userId: any) => {
  const isUserExist = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!isUserExist) {
    throw new ApiError(404, "User not found");
  }

  const isClientExist = await prisma.clients.findUnique({
    where: {
      id: data.clientId,
    },
  });

  if (!isClientExist) {
    throw new ApiError(404, "Client not found");
  }

  if (data.projectId) {
    const isProjectExist = await prisma.project.findUnique({
      where: { id: data.projectId },
    });

    if (!isProjectExist) {
      throw new ApiError(404, "Project not found");
    }
  }

  const updatedData = { ...data, userId };
  const result = await prisma.log.create({ data: updatedData });
  return result;
};

const getAllLogs = async (userId: any) => {
  const isUserExist = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!isUserExist) {
    throw new ApiError(404, "User not found");
  }

  const result = await prisma.log.findMany({
    where: { userId: userId },
    include: {
      Client: true,
      Project: true,
    },
  });
  return result;
};

export const LogsService = { createLog, getAllLogs };
