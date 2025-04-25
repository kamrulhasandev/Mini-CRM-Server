import { PrismaClient } from "@prisma/client";
import { ICreateProject } from "./project.interface";
import ApiError from "../../errors/AppError";
const prisma = new PrismaClient();

const createProject = async (data: ICreateProject, userId: any) => {
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

  const updateData = { ...data, userId };
  const result = await prisma.project.create({ data: updateData });
  return result;
};

const updateProject = async (
  data: Partial<ICreateProject>,
  userId: any,
  projectId: string
) => {
  const isUserExist = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!isUserExist) {
    throw new ApiError(404, "User not found");
  }

  const isProjectExist = await prisma.project.findUnique({
    where: {
      id: projectId,
    },
  });

  if (!isProjectExist) {
    throw new ApiError(404, "Project not found");
  }

  const { clientId, ...restData } = data;

  const updateData = { ...restData, userId };

  const result = await prisma.project.update({
    where: { id: projectId },
    data: updateData,
  });

  return result;
};

const deleteProject = async (userId: any, projectId: string) => {
  const isUserExist = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!isUserExist) {
    throw new ApiError(404, "User not found");
  }

  const isProjectExist = await prisma.project.findUnique({
    where: {
      id: projectId,
    },
  });

  if (!isProjectExist) {
    throw new ApiError(404, "Project not found");
  }

  const result = await prisma.project.delete({
    where: { id: projectId },
  });

  return result;
};

const getAllProjects = async (userId: any) => {
  const isUserExist = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!isUserExist) {
    throw new ApiError(404, "User not found");
  }
  const result = await prisma.project.findMany({
    where: { userId: userId },
    select: {
      id: true,
      title: true,
      budget: true,
      deadline: true,
      status: true,
      Client: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          company: true,
        },
      },
    },
  });
  return result;
};

const getProject = async (userId: any, projectId: string) => {
  const isUserExist = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!isUserExist) {
    throw new ApiError(404, "User not found");
  }

  const isProjectExist = await prisma.project.findUnique({
    where: {
      id: projectId,
    },
  });

  if (!isProjectExist) {
    throw new ApiError(404, "Project not found");
  }

  const result = await prisma.project.findUnique({
    where: { id: projectId },
    include: {
      Client: true,
    },
  });

  return result;
};

export const ProjectService = {
  createProject,
  updateProject,
  deleteProject,
  getAllProjects,
  getProject,
};
