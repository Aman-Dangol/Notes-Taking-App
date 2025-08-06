import express from "express";
import { exitCode } from "process";

const authRouter = express.Router();

authRouter.get("/login", (req, res) => {});

export { authRouter };
