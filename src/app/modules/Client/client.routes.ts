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

router.patch(
  "/:clientId",
  auth,
  validateRequest(ClientValidation.updateClientSchema),
  ClientController.updateClient
);

router.delete("/:clientId", auth, ClientController.deleteClient);

router.get("/all-clients", auth, ClientController.getAllClients);

router.get("/:clientId", auth, ClientController.getClient);

export const ClientRoutes = router;
