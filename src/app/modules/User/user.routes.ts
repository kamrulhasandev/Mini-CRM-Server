import express from "express";
import { UserController } from "./user.controller";
import validateRequest from "../../middlewares/validationRequest";
import { UserValidation } from "./user.validation";

const router = express.Router();

router.post(
  "/register",
  validateRequest(UserValidation.registerUserSchema),
  UserController.registerUser
);

export const UserRoutes = router;
