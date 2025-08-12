import {
  getUserDetails,
  getUserInfoToSend,
} from "@/controller/user-controller";
import express from "express";

const userRouter = express.Router();

userRouter.get("/userInfo", getUserDetails, getUserInfoToSend);

export { userRouter };
