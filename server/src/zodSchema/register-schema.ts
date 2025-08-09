import { error } from "console";
import { NextFunction, Request, Response } from "express";
import { utimes } from "fs";
import { z, ZodError } from "zod";

const registerScehma = z.object({
  userName: z.string().min(1),
  email: z.email().min(1),
  password: z.string().min(4),
});

type registerData = z.infer<typeof registerScehma>;

export type { registerData };
export { registerScehma };
