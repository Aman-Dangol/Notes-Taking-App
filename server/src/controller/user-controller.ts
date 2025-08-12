import { NextFunction, Request, Response } from "express";
import prisma from "../../prisma/connect";
import { User } from "../../generated/prisma";
import { CustomRequest } from "@/utility/types/custom-request";
import jwt from "jsonwebtoken";
import { tr } from "zod/v4/locales";

/**
 * Returns all users.
 */
const getUsers = async (_: Request, res: Response<{ users: User[] }>) => {
  const users = await prisma.user.findMany();
  res.json({
    users,
  });
};

/**
 * Middleware: attaches authenticated user (if any) to app.locals.
 * - Reads bearer token, decodes payload, loads user by `id`.
 * - Silently continues if token/payload/user is missing.
 */
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

export const getUserInfoToSend = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { id, email, userName, password, ...others } =
    req.app.locals.user ?? {};
  const noteCount = await prisma.note.count({
    where: {
      userID: id || "",
    },
  });

  let hashedEmail = email?.replace(/(\w{3})[\w.-]+@([\w.]+\w)/, "$1***@$2");

  const categories = await prisma.category.findMany({
    where: {
      userID: id || "",
    },
  });
  if (others) {
  }

  const payload = {
    userInfo: {
      userName,
      email: hashedEmail,
    },
    noteCount,
    categories,
  };

  res.json(payload);
};
export { getUsers };
