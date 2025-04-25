import express from "express";
import { DashboardController } from "./dashboard.controller";
import auth from "../../middlewares/auth";

const router = express.Router();

router.get("/", auth, DashboardController.getDashboardData);

export const DashboardRoutes = router;
