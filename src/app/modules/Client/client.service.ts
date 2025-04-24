import { PrismaClient } from "@prisma/client";
import { ICreateClient } from "./client.interface";
const prisma = new PrismaClient();

const createClient = async (data: ICreateClient, userId: any) => {
  const updateData = { ...data, userId };
  const result = await prisma.clients.create({ data: updateData });

  return result;
};

export const ClientService = {
  createClient,
};
