import { PrismaClient } from "@prisma/client";
import { ICreateClient } from "./client.interface";
import ApiError from "../../errors/AppError";
const prisma = new PrismaClient();

const createClient = async (data: ICreateClient, userId: any) => {
  const updateData = { ...data, userId };
  const result = await prisma.clients.create({ data: updateData });
  return result;
};

const updateClient = async (
  data: Partial<ICreateClient>,
  userId: any,
  clientId: string
) => {
  const client = await prisma.clients.findUnique({
    where: { id: clientId },
  });

  if (!client) {
    throw new ApiError(404, "Client not found");
  }

  if (client.userId !== userId) {
    throw new ApiError(403, "You do not have permission to update this client");
  }

  const updateData = { ...data, userId };
  const result = await prisma.clients.update({
    where: { id: clientId },
    data: updateData,
  });

  return result;
};

const deleteClient = async (userId: any, clientId: string) => {
  const client = await prisma.clients.findUnique({
    where: { id: clientId },
  });

  if (!client) {
    throw new ApiError(404, "Client not found");
  }

  if (client.userId !== userId) {
    throw new ApiError(403, "You do not have permission to delete this client");
  }

  const result = await prisma.clients.delete({
    where: { id: clientId },
  });

  return result;
};

const getAllClients = async (userId: any) => {
  const result = await prisma.clients.findMany({
    where: { userId: userId },
  });
  return result;
};

const getClient = async (userId: any, clientId: string) => {
  const result = await prisma.clients.findUnique({
    where: { id: clientId },
  });

  if (!result) {
    throw new ApiError(404, `Client with ID ${clientId} not found.`);
  }

  if (result.userId !== userId) {
    throw new ApiError(403, "You are not authorized to view this client.");
  }

  return result;
};

export const ClientService = {
  createClient,
  updateClient,
  deleteClient,
  getAllClients,
  getClient,
};
