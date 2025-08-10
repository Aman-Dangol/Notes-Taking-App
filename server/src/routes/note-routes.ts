import { CustomRequest } from "@/utility/types/custom-request";
import { noteSchema, noteSchemaInput } from "@/zodSchema/note-schema";
import express, { Response } from "express";
import { zodValidator } from "@/middlewares/zod-validator/zodValidator";
import { createNote, getNoteByUserID } from "@/controller/note-controller";
import { getUserDetails } from "@/controller/user-controller";

const noteRouter = express.Router();

noteRouter.post(
  "/create",
  zodValidator(noteSchema),
  getUserDetails,
  createNote
);

noteRouter.get("/", getUserDetails, getNoteByUserID);

export { noteRouter };
