import express from "express";
import { ReminderController } from "./reminder.controller";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validationRequest";
import { ReminderValidation } from "./reminder.validation";

const router = express.Router();

router.post(
  "/create-reminder",
  auth,
  validateRequest(ReminderValidation.createReminderSchema),
  ReminderController.createReminder
);

router.get("/all-reminders", auth, ReminderController.getAllReminders);

export const RemindersRoutes = router;
