import { compare, hashFn } from "@/utility/bcrypt-hasher/hashPassword";
import { generateToken } from "@/utility/token-generator/token-generator";
import { CustomRequest } from "@/utility/types/custom-request";
import { loginData } from "@/zodSchema/login-schema";
import { registerData } from "@/zodSchema/register-schema";
import { NextFunction, Response } from "express";
import { User } from "../../generated/prisma";
import prisma from "../../prisma/connect";

// to check if the email already exists in the DB
export const getUserByEmail = async (
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

// check if email actuallu exists before handling login
export const checkEmailInDb = async (
  request: CustomRequest<loginData & { userObj: registerData }>,
  res: Response,
  next: NextFunction
) => {
  const user = await prisma.user.findUnique({
    where: {
      email: request.body.email,
    },
  });
  if (user) {
    request.body.userObj = user;
    next();
    return;
  }

  res.json({ message: "email doesn't exist" });
};

export const userLogin = async (
  req: CustomRequest<loginData & { userObj: User }>,
  res: Response
) => {
  const {
    userObj: { password },
  } = req.body;

  const id = req.body.userObj.id;

  const result = await compare(req.body.password, password);

  if (result) {
    const accessToken = generateToken({
      payload: { id },
    });

    const refreshToken = generateToken({ payload: { id }, expiresIn: "7d" });
    res.cookie("rt", refreshToken, {
      httpOnly: true,
    });

    res.json({ accessToken });
    return;
  }
  res.json({
    message: "invalid credentials",
  });
};

export const createUser = async (
  req: CustomRequest<registerData>,
  res: Response<{ message: string }>
) => {
  const { password, ...others } = req.body;
  const hashed = await hashFn(password);

  prisma.user
    .create({
      data: { ...others, password: hashed },
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
