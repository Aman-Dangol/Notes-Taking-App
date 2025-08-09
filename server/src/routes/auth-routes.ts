import { zodValidator } from "@/middlewares/zod-validator/zodValidator";
import { registerScehma } from "@/zodSchema/register-schema";
import express from "express";

import { loginScehma } from "@/zodSchema/login-schema";
import {
  checkEmailInDb,
  userLogin,
  getUserByEmail,
  createUser,
} from "@/controller/auth-controller";

const authRouter = express.Router();

authRouter.post("/login", zodValidator(loginScehma), checkEmailInDb, userLogin);

authRouter.post(
  "/register",
  zodValidator(registerScehma),
  getUserByEmail,
  createUser
);

export { authRouter };
