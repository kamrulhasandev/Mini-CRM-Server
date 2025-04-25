import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { DashboardService } from "./dasrhboard.service";

const getDashboardData = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const data = await DashboardService.getDashboardData(user.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Dashboard data fetched successfully",
    data,
  });
});

export const DashboardController = { getDashboardData };
