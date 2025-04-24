import express from "express";
import validateRequest from "../../middlewares/validationRequest";
import { ClientValidation } from "./client.validation";
import { ClientController } from "./client.controller";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post(
  "/create-client",
  auth,
  validateRequest(ClientValidation.createClientSchema),
  ClientController.createClient
);

export const ClientRoutes = router;
