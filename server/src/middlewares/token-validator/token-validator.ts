import { logger } from "@/utility/logger/winston";
import { generateToken } from "@/utility/token-generator/token-generator";
import { CustomRequest } from "@/utility/types/custom-request";
import { verifyToken } from "@/utility/verify-tokens";
import { NextFunction, Response } from "express";

/**
 * Middleware to validate or refresh authentication tokens.
 * - Checks for an access token in the `Authorization` header.
 * - Verifies the access token; if valid → calls `next()`.
 * - If invalid and a refresh token exists, verifies it and issues a new access token.
 * - Responds with appropriate error messages if tokens are missing or invalid.
 */
export const tokenValidatorMiddleWare = (
  req: CustomRequest,
  res: Response<{ message: string; accessToken?: string }>,
  next: NextFunction
) => {
  console.log("object");
  if (!req.headers.authorization) {
    logger.log({
      message: "Access Token Missing",
      level: "error",
    });

    res.json({ message: "please login access token missing" });
    return;
  }
  const accessToken = req.headers.authorization?.split(" ")[1];
  const refreshToken = req.cookies.refreshToken;

  // verify access token
  // if access token is valid
  if (verifyToken(accessToken)) {
    next();
    return;
  } else {
    res.json({ message: "invalid Token" });
  }

  // if refresh token is empty or doesn't exist
  if (!refreshToken) {
    res
      .status(401)
      .json({ message: "please login . refresh token is missing" });
    return;
  }
  const token = verifyToken(refreshToken);
  if (token) {
    const newToken = generateToken({
      payload: { id: token },
    });

    res.setHeader("access-token", newToken);
    next();
    return;
  }
};
