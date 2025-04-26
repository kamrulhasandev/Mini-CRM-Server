import express, { Application, Request, Response } from "express";
import cors from "cors";
import router from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import cookieParser from "cookie-parser";

const app: Application = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://mini-crm-client-lx9e.vercel.app",
    ],
    credentials: true,
  })
);

app.get("/", (req: Request, res: Response) => {
  res.json({
    status: "success",
    message: "Server is running",
    data: null,
  });
});

app.use("/api", router);
app.use(globalErrorHandler);
app.use(notFound);

export default app;
