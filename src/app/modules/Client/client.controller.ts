import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { ClientService } from "./client.service";
import sendResponse from "../../shared/sendResponse";

const createClient = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const result = await ClientService.createClient(req.body, user.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Client created successfully",
    data: result,
  });
});

export const ClientController = { createClient };
