import { zodValidator } from "@/middlewares/zod-validator/zodValidator";
import { registerScehma } from "@/zodSchema/register-schema";
import express, { NextFunction, Request, Response } from "express";
import { createUser, getUserByEmail } from "@/controller/user-controller";

const authRouter = express.Router();

authRouter.get("/login", (req, res) => {
  res.json({ message: "auth-router" });
});

authRouter.post(
  "/register",
  zodValidator(registerScehma),
  getUserByEmail,
  createUser
);

export { authRouter };
