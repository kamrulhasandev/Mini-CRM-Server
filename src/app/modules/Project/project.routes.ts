import express from "express";
import { ProjectController } from "./project.controller";
import validateRequest from "../../middlewares/validationRequest";
import { ProjectValidation } from "./project.validation";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post(
  "/create-project",
  auth,
  validateRequest(ProjectValidation.createProjectSchema),
  ProjectController.createProject
);

router.patch(
  "/:projectId",
  auth,
  validateRequest(ProjectValidation.updateProjectSchema),
  ProjectController.updateProject
);

router.delete("/:projectId", auth, ProjectController.deleteProject);

router.get("/all-projects", auth, ProjectController.getAllProjects);

router.get("/:projectId", auth, ProjectController.getProject);

export const ProjectRoutes = router;
