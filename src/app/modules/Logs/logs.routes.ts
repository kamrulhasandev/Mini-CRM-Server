import express from "express";
import { LogsController } from "./logs.controller";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validationRequest";
import { LogsValidation } from "./logs.validation";

const router = express.Router();

router.post(
  "/create-log",
  auth,
  validateRequest(LogsValidation.createLogSchema),
  LogsController.createLog
);

router.get("/all-logs", auth, LogsController.getAllLogs);

export const LogsRoutes = router;
