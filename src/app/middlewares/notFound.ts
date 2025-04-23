import { NextFunction, Request, Response } from "express";

const notFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: "API NOT FOUND!.",
    error: {
      path: req.originalUrl,
      method: req.method,
      timestamp: new Date().toISOString(),
      message: "Not Found - The server can not find the requested resource.",
    },
  });
};

export default notFound;
