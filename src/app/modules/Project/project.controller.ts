import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { ProjectService } from "./project.service";
import sendResponse from "../../shared/sendResponse";

const createProject = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const result = await ProjectService.createProject(req.body, user.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Project created successfully",
    data: result,
  });
});
const updateProject = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const result = await ProjectService.updateProject(
    req.body,
    user.id,
    req.params.projectId
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Project updated successfully",
    data: result,
  });
});

const deleteProject = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const result = await ProjectService.deleteProject(
    user.id,
    req.params.projectId
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Project deleted successfully",
    data: result,
  });
});

const getAllProjects = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const result = await ProjectService.getAllProjects(user.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Projects fetched successfully",
    data: result,
  });
});

const getProject = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const result = await ProjectService.getProject(user.id, req.params.projectId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Project fetched successfully",
    data: result,
  });
});

export const ProjectController = {
  createProject,
  updateProject,
  deleteProject,
  getAllProjects,
  getProject,
};
