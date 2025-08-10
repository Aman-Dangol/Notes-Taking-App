import { getCategoryByUser } from "@/controller/category-controller";
import { getNoteByUserID } from "@/controller/note-controller";
import { getUserDetails } from "@/controller/user-controller";
import express from "express";

const categoryRouter = express.Router();

categoryRouter.get("/", getUserDetails, getCategoryByUser);

export { categoryRouter };
