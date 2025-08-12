import {
  getUserDetails,
  getUserInfoToSend,
  getUsers,
} from "@/controller/user-controller";
import express from "express";

const userRouter = express.Router();

userRouter.get("/user", getUsers);

userRouter.get("/userInfo", getUserDetails, getUserInfoToSend);

export { userRouter };
