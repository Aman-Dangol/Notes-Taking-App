import express from "express";
import { createUser, getUser, getUsers } from "../controller/user-controller";

const userRouter = express.Router();

userRouter.get("/user", getUsers);

userRouter.get("/user/:id", getUser);

userRouter.post("/user", createUser);

export { userRouter };
