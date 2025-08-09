import { NextFunction, Request, Response } from "express";
import prisma from "../../prisma/connect";
import { User } from "../../generated/prisma";
import { CustomRequest } from "../utility/types/custom-request";
import { registerData } from "@/zodSchema/register-schema";

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
      id: request.query.userID,
    },
  });

  if (user) {
    res.sendStatus(200).json({ user });
    return;
  }
  res.sendStatus(404).json({ err: "err" });
};

const getUserByEmail = async (
  request: CustomRequest<registerData>,
  res: Response,
  next: NextFunction
) => {
  const user = await prisma.user.findUnique({
    where: {
      email: request.body.email,
    },
  });
  if (!user) {
    next();
    return;
  }

  res.json({ message: "email is already taken" });
};

const createUser = async (
  req: CustomRequest<registerData>,
  res: Response<{ message: string }>
) => {
  prisma.user
    .create({
      data: req.body,
    })
    .then(() => {
      res.json({
        message: "data created successfully",
      });
    })
    .catch(() => {
      res.sendStatus(400).json({
        message: "error",
      });
    });
};

export { getUsers, getUser, createUser, getUserByEmail };
