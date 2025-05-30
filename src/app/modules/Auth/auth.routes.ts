import express from "express";
import { AuthController } from "./auth.controller";
import validateRequest from "../../middlewares/validationRequest";
import { AuthValidation } from "./auth.validation";

const router = express.Router();

router.post(
  "/login",
  validateRequest(AuthValidation.loginUserSchema),
  AuthController.loginUser
);

router.post("/refresh-token", AuthController.refreshToken);

export const AuthRoutes = router;
