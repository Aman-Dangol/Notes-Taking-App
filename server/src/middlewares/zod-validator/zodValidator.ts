import { NextFunction, Request, Response } from "express";
import { ZodError, ZodObject, ZodType } from "zod";
import { CustomRequest } from "@/utility/types/custom-request";
import { noteSchemaInput } from "@/zodSchema/note-schema";

/**
 *
 * @param schema either a zod object or a zodtype
 * @returns a middleware express function
 */
const zodValidator = (schema: ZodObject | ZodType) => {
  return (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (e) {
      if (e instanceof ZodError) {
        const response = e.issues.map((item) => ({
          [item.path + ""]: { message: item.message },
        }));
        res.json(response);
      }
    }
  };
};

export { zodValidator };
