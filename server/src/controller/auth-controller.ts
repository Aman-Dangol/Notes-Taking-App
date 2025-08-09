import { compare, hashFn } from "@/utility/bcrypt-hasher/hashPassword";
import { generateToken } from "@/utility/token-generator/token-generator";
import { CustomRequest } from "@/utility/types/custom-request";
import { loginData } from "@/zodSchema/login-schema";
import { registerData } from "@/zodSchema/register-schema";
import { NextFunction, Response } from "express";
import { User } from "../../generated/prisma";
import prisma from "../../prisma/connect";
import jwt from "jsonwebtoken";
import { verifyToken } from "@/utility/verify-tokens";

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

  res.status(404).json({ message: "email doesn't exist" });
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
  res.status(404).json({
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

// for every time  a page refreshes
export const validateToken = (
  req: CustomRequest,
  res: Response<{ message: string; accessToken?: string }>,
  next: NextFunction
) => {
  if (!req.headers.authorization) {
    res.status(401).json({ message: "please login access token missing" });
    return;
  }
  const accessToken = req.headers.authorization?.split(" ")[1];
  const refereshToken = req.cookies.rt;

  // verify access token
  // if access token is valid
  if (verifyToken(accessToken)) {
    res.status(200).json({ message: "accessToken valid" });
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
    res.status(200).json({
      message: "new token generated",
    });
    return;
  }
};
