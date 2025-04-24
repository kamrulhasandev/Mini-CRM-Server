import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { LogsService } from "./logs.service";
import sendResponse from "../../shared/sendResponse";

const createLog = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const result = await LogsService.createLog(req.body, user.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Log created successfully",
    data: result,
  });
});

const getAllLogs = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const result = await LogsService.getAllLogs(user.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Logs fetched successfully",
    data: result,
  });
});

export const LogsController = { createLog, getAllLogs };
