import { compare, hashFn } from "@/utility/bcrypt-hasher/hashPassword";
import { generateToken } from "@/utility/token-generator/token-generator";
import { CustomRequest } from "@/utility/types/custom-request";
import { loginData } from "@/zodSchema/login-schema";
import { registerData } from "@/zodSchema/register-schema";
import { NextFunction, Response } from "express";
import { User } from "../../generated/prisma";
import prisma from "../../prisma/connect";
import { verifyToken } from "@/utility/verify-tokens";

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

  res.status(409).json({ message: "email is already taken" });
};

// check if email actually exists before handling login
export const checkEmailInDb = async (
  request: CustomRequest<
    loginData & { userObj: Omit<registerData, "confirmPassword"> }
  >,
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
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    });

    res.json({ accessToken });
    return;
  }
  res.status(404).json({
    message: "Invalid credentials",
  });
};

export const createUser = async (
  req: CustomRequest<registerData>,
  res: Response<{ message: string }>
) => {
  const { password, confirmPassword, ...others } = req.body;
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
    .catch((e) => {
      res.status(400).json({
        message: e,
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
  const refreshToken = req.cookies.refreshToken;

  // verify access token
  // if access token is valid
  if (verifyToken(accessToken)) {
    res.status(200).json({ message: "accessToken valid" });
    return;
  }

  // if refresh token is empty or doesn't exist
  if (!refreshToken) {
    res
      .status(401)
      .json({ message: "please login . refresh token is missing" });
    return;
  }
  const token = verifyToken(refreshToken);
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

export const logout = (_: CustomRequest, res: Response) => {
  res.clearCookie("refreshToken");
  res.status(200).json({ message: "logout successfully" });
};
