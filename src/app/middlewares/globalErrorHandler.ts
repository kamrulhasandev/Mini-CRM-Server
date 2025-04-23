import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { Prisma } from "@prisma/client";
import handleZodError from "../errors/handleZodError";
import ApiError from "../errors/AppError";

const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode: number = 500;
  let message = "Something went wrong!";
  let errorDetails: any = [];

  // Handle ApiError
  if (error instanceof ApiError) {
    statusCode = error.statusCode;
    message = error.message || message;
    errorDetails = error.message;
  }
  // Handle Zod validation errors
  else if (error instanceof ZodError) {
    const formatted = handleZodError(error);
    statusCode = 400;
    message = formatted.message;
    errorDetails = formatted.errorDetails;
  }
  // Handle Prisma validation error
  else if (error instanceof Prisma.PrismaClientValidationError) {
    statusCode = 400;
    message = "Prisma validation failed";
    errorDetails = error.message;
  }
  // Handle Prisma known request error
  else if (error instanceof Prisma.PrismaClientKnownRequestError) {
    statusCode = 400;
    if (error.code === "P2002") {
      message = "Duplicate field value violates unique constraint";
    } else if (error.code === "P2025") {
      message = "Record not found for operation";
    } else {
      message = "Database request error";
    }
    errorDetails = error.meta || error.message;
  }
  // Handle regular JS error
  else if (error instanceof Error) {
    message = error.message;
    errorDetails = error.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorDetails: Array.isArray(errorDetails) ? errorDetails : [errorDetails],
  });
};

export default globalErrorHandler;
