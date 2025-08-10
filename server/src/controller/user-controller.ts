import { NextFunction, Request, Response } from "express";
import prisma from "../../prisma/connect";
import { User } from "../../generated/prisma";
import { CustomRequest } from "@/utility/types/custom-request";
import jwt from "jsonwebtoken";

const getUsers = async (_: Request, res: Response<{ users: User[] }>) => {
  const users = await prisma.user.findMany();
  res.json({
    users,
  });
};

export const getUserDetails = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.headers.authorization?.split(" ")[1] ?? "";

  const payload = jwt.decode(accessToken, {
    json: true,
  });

  const user = await prisma.user.findUnique({
    where: {
      id: payload?.id ?? 0,
    },
  });

  if (user) req.app.locals.user = user;
  next();
};

export { getUsers };
