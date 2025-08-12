import { NextFunction, Request, Response } from "express";
import prisma from "../../prisma/connect";
import { User } from "../../generated/prisma";
import { CustomRequest } from "@/utility/types/custom-request";
import jwt from "jsonwebtoken";
import { tr } from "zod/v4/locales";
import { logger } from "@/utility/logger/winston";
import { userInfo } from "os";

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

  logger.log({
    message: `provided ${user?.email}'s details`,
    level: "info",
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

  logger.log({
    message: `sent ${email}'s data to client`,
    level: "info",
  });
  res.json(payload);
};
