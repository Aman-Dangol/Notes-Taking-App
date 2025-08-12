import { z } from "zod";

export const noteSchema = z.object({
  id: z.coerce.number().optional(),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  category: z
    .array(z.object({ categoryName: z.string() }))
    .min(1, "At least one category is required"),
});

export type noteSchemaOutput = z.infer<typeof noteSchema>;
export type noteSchemaInput = z.input<typeof noteSchema>;
