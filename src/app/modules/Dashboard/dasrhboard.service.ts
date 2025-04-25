import { PrismaClient } from "@prisma/client";
import ApiError from "../../errors/AppError";
const prisma = new PrismaClient();

const getDashboardData = async (userId: string) => {
  const isUserExist = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!isUserExist) {
    throw new ApiError(404, "User not found");
  }

  try {
    const totalClients = await prisma.clients.count({
      where: { userId: userId },
    });

    const totalProjects = await prisma.project.count({
      where: { userId: userId },
    });

    const remindersDueSoon = await prisma.reminder.findMany({
      where: {
        userId: userId,
        dueDate: {
          gte: new Date(),
          lte: new Date(new Date().setDate(new Date().getDate() + 7)),
        },
      },
      select: {
        id: true,
        dueDate: true,
        message: true,
        Client: {
          select: {
            name: true,
            email: true,
          },
        },
        Project: {
          select: {
            title: true,
          },
        },
      },
    });

    const projectsByStatus = await prisma.project.groupBy({
      by: ["status"],
      where: { userId: userId },
      _count: {
        status: true,
      },
    });

    return {
      totalClients,
      totalProjects,
      remindersDueSoon,
      projectsByStatus: projectsByStatus.map((status) => ({
        status: status.status,
        count: status._count.status,
      })),
    };
  } catch (error) {
    throw new ApiError(500, "Error fetching dashboard data");
  }
};

export const DashboardService = { getDashboardData };
