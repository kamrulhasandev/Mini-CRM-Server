import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { AuthServices } from "./auth.service";
import sendResponse from "../../shared/sendResponse";

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.loginUser(req.body);
  const { refreshToken } = result;
  res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: false });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User Logged in successfully",
    data: {
      accessToken: result.accessToken,
    },
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.refreshToken(req.cookies.refreshToken);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User Logged in successfully",
    data: result,
  });
});

export const AuthController = { loginUser, refreshToken };
