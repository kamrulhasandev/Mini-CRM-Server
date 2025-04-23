import { Request, Response } from "express";
import { UserService } from "./user.service";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";

const registerUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.registerUser(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User created successfully",
    data: result,
  });
});

export const UserController = { registerUser };
