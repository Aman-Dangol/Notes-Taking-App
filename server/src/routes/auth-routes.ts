import { zodValidator } from "@/middlewares/zod-validator/zodValidator";
import { registerSchema } from "@/zodSchema/register-schema";
import express from "express";

import { loginSchema } from "@/zodSchema/login-schema";
import {
  checkEmailInDb,
  userLogin,
  getUserByEmail,
  createUser,
  validateToken,
  logout,
} from "@/controller/auth-controller";
import { getUserDetails } from "@/controller/user-controller";

/**
 * Auth routes:
 * - POST /login → Validates login data, checks email, logs in user.
 * - POST /register → Validates registration data, ensures email is free, creates user.
 * - GET /verify-token → Checks if access token is valid.
 * - GET /logout → Logs the user out.
 */
const authRouter = express.Router();

authRouter.post("/login", zodValidator(loginSchema), checkEmailInDb, userLogin);

authRouter.post(
  "/register",
  zodValidator(registerSchema),
  getUserByEmail,
  createUser
);

authRouter.get("/verify-token", validateToken);

authRouter.get("/logout", getUserDetails, logout);

export { authRouter };
