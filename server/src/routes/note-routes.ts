import { CustomRequest } from "@/utility/types/custom-request";
import { noteSchema, noteSchemaInput } from "@/zodSchema/note-schema";
import express, { Response } from "express";
import { zodValidator } from "@/middlewares/zod-validator/zodValidator";
import {
  checkNoteExist,
  createNote,
  deleteNote,
  getNoteByID,
  getNoteByUserID,
  updateNote,
} from "@/controller/note-controller";
import { getUserDetails } from "@/controller/user-controller";
import prisma from "../../prisma/connect";

const noteRouter = express.Router();

noteRouter.post(
  "/create",
  zodValidator(noteSchema),
  getUserDetails,
  createNote
);

noteRouter.get("/:id", getNoteByID);

noteRouter.get("/", getUserDetails, getNoteByUserID);

noteRouter.delete("/", checkNoteExist, deleteNote);

noteRouter.put(
  "/",
  zodValidator(noteSchema),
  checkNoteExist,
  getUserDetails,
  updateNote
);

export { noteRouter };
