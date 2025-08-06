import { Request, Response } from "express";
import prisma from "../../prisma/connect";
import { User } from "../../generated/prisma";
import { CustomRequest } from "../utility/types/custom-request";

const getUsers = async (_: Request, res: Response<{ users: User[] }>) => {
  const users = await prisma.user.findMany();
  res.json({
    users,
  });
};

const getUser = async (
  request: CustomRequest<{}, { userID: string }>,
  res: Response<{ user: User } | { err: string }>
) => {
  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(request.query.userID),
    },
  });

  if (user) {
    res.sendStatus(200).json({ user });
    return;
  }
  res.sendStatus(404).json({ err: "err" });
};

const createUser = async (
  req: CustomRequest<Omit<User, "id">>,
  res: Response<{ message: string }>
) => {
  prisma.user
    .create({
      data: req.body,
    })
    .then(() => {
      res.json({
        message: "success",
      });
    })
    .catch(() => {
      res.sendStatus(400).json({
        message: "error",
      });
    });
};

export { getUsers, getUser, createUser };
