import express from "express";
import { UserRoutes } from "../modules/User/user.routes";
import { AuthRoutes } from "../modules/Auth/auth.routes";
import { ClientRoutes } from "../modules/Client/client.routes";
import { ProjectRoutes } from "../modules/Project/project.routes";
import { LogsRoutes } from "../modules/Logs/logs.routes";
import { RemindersRoutes } from "../modules/Reminder/reminder.routes";
import { DashboardRoutes } from "./../modules/Dashboard/dashboard.routes";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/client",
    route: ClientRoutes,
  },
  {
    path: "/project",
    route: ProjectRoutes,
  },
  {
    path: "/logs",
    route: LogsRoutes,
  },
  {
    path: "/reminders",
    route: RemindersRoutes,
  },
  {
    path: "/dashboard",
    route: DashboardRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
