import { getUser, getUsers } from "@/controller/user-controller";
import express from "express";

const userRouter = express.Router();

userRouter.get("/user", getUsers);

userRouter.get("/user/:id", getUser);

export { userRouter };
