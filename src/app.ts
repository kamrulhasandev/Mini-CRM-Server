import express, { Application, Request, Response } from "express";
import cors from "cors";
import router from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";

const app: Application = express();
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.json({
    status: "success",
    message: "Server is running",
    data: null,
  });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);
app.use(globalErrorHandler);
app.use(notFound);

export default app;
