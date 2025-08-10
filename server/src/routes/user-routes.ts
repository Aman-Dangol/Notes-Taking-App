import { getUsers } from "@/controller/user-controller";
import express from "express";

const userRouter = express.Router();

userRouter.get("/user", getUsers);

export { userRouter };
