import { generateToken } from "@/utility/token-generator/token-generator";
import { CustomRequest } from "@/utility/types/custom-request";
import { verifyToken } from "@/utility/verify-tokens";
import { NextFunction, Response } from "express";

export const tokenValidatorMiddleWare = (
  req: CustomRequest,
  res: Response<{ message: string; accessToken?: string }>,
  next: NextFunction
) => {
  if (!req.headers.authorization) {
    res.json({ message: "please login access token missing" });
    return;
  }
  const accessToken = req.headers.authorization?.split(" ")[1];
  const refereshToken = req.cookies.rt;

  // verify access token
  // if access token is valid
  if (verifyToken(accessToken)) {
    next();
    return;
  }

  // if refresh token is empty or doesnt exist
  if (!refereshToken) {
    res
      .status(401)
      .json({ message: "please login . refresh token is missing" });
    return;
  }
  const token = verifyToken(refereshToken);
  if (token) {
    const newToken = generateToken({
      payload: { id: token },
    });

    res.setHeader("access-token", newToken);
    next();
    return;
  }
};
