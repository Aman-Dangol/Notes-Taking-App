import express from "express";
import { exitCode } from "process";

const authRouter = express.Router();

authRouter.get("/login", (req, res) => {});

authRouter.get("/register", (req, res) => {});

export { authRouter };
