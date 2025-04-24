import { PrismaClient } from "@prisma/client";
import ApiError from "../../errors/AppError";
import { ICreateReminder } from "./reminder.interface";

const prisma = new PrismaClient();

const createReminder = async (data: ICreateReminder, userId: any) => {
  const isUserExist = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!isUserExist) {
    throw new ApiError(404, "User not found");
  }

  const isClientExist = await prisma.clients.findUnique({
    where: { id: data.clientId },
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
  const result = await prisma.reminder.create({ data: updatedData });
  return result;
};

const getAllReminders = async (userId: any) => {
  const isUserExist = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!isUserExist) {
    throw new ApiError(404, "User not found");
  }

  const result = await prisma.reminder.findMany({
    where: { userId },
    include: {
      Client: true,
      Project: true,
    },
  });

  return result;
};

export const ReminderService = { createReminder, getAllReminders };
