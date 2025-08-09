import { CustomRequest } from "@/utility/types/custom-request";
import { NextFunction, Response } from "express";

export const tokenValidator = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.headers.authorization?.split(" ");
  const refereshToken = req.cookies.rt;
  next();
};
