import { CustomRequest } from "@/utility/types/custom-request";
import { Response } from "express";
import prisma from "../../prisma/connect";

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
      message: "no category found",
    });
    return;
  }
  res.status(200).json({
    categories: category,
  });
};
