import { z } from "zod";

/**
 * Zod schema for validating note input.
 * Ensures that title and description are non-empty strings,
 * and that category is an array with at least one object containing a categoryName.
 */
export const noteSchema = z.object({
  id: z.coerce.number().optional(),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  category: z
    .array(z.object({ categoryName: z.string() }))
    .min(1, "At least one category is required"),
});

export type noteSchemaInput = z.infer<typeof noteSchema>;
