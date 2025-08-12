import { CustomRequest } from "@/utility/types/custom-request";
import { Response } from "express";
import prisma from "../../prisma/connect";
import { logger } from "@/utility/logger/winston";

/**
 * Fetches categories for the authenticated user.
 * - Reads `user` from `req.app.locals`.
 * - Returns categories without `userID`, or a message if none found.
 */
export const getCategoryByUser = async (req: CustomRequest, res: Response) => {
  const user = req.app.locals.user;
  const category = await prisma.category.findMany({
    where: {
      userID: user?.id,
    },
    omit: {
      userID: true,
    },
  });

  if (category.length === 0) {
    res.json({
      message: "No category found",
    });
    return;
  }

  logger.log({
    message: `Served ${user?.email} their categories`,
    level: "info",
  });

  res.status(200).json({
    categories: category,
  });
};
