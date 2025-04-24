import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { ReminderService } from "./reminder.service";
import sendResponse from "../../shared/sendResponse";

const createReminder = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const result = await ReminderService.createReminder(req.body, user.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Reminder created successfully",
    data: result,
  });
});

const getAllReminders = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const result = await ReminderService.getAllReminders(user.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Reminders fetched successfully",
    data: result,
  });
});

export const ReminderController = { createReminder, getAllReminders };
