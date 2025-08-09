import { CustomRequest } from "@/utility/types/custom-request";
import { zodValidator } from "@/middlewares/zod-validator/zodValidator";
import { registerScehma } from "@/zodSchema/register-schema";
import express, { NextFunction, Request, Response } from "express";

const authRouter = express.Router();

authRouter.get("/login", (req, res) => {
  res.json({ message: "auth-router" });
});

authRouter.post(
  "/register",
  zodValidator(registerScehma),
  (req: CustomRequest, res) => {
    res.json("asda");
  }
);

export { authRouter };
