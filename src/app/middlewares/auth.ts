import { NextFunction, Request, Response } from "express";

import { Secret } from "jsonwebtoken";

import { jwtHelpers } from "../helpers/jwtHelpers";
import config from "../config";
import ApiError from "../errors/AppError";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      throw new ApiError(401, "You are not authorized");
    }

    const verifiedUser = jwtHelpers.verifyToken(
      token,
      config.jwt.secret as Secret
    );
    req.user = verifiedUser;

    next();
  } catch (error) {
    next(error);
  }
};

export default auth;
