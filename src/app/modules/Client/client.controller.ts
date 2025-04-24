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

const updateClient = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const result = await ClientService.updateClient(
    req.body,
    user.id,
    req.params.clientId
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Client updated successfully",
    data: result,
  });
});

const deleteClient = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const result = await ClientService.deleteClient(user.id, req.params.clientId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Client deleted successfully",
    data: result,
  });
});

const getAllClients = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const result = await ClientService.getAllClients(user.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Clients fetched successfully",
    data: result,
  });
});

const getClient = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const result = await ClientService.getClient(user.id, req.params.clientId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Client fetched successfully",
    data: result,
  });
});

export const ClientController = {
  createClient,
  updateClient,
  deleteClient,
  getAllClients,
  getClient,
};
