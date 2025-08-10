import { z } from "zod";

export const noteSchema = z.object({
  title: z.string().min(1, "the fiels is required"),
  description: z.string().min(1, "the fiels is required"),
  category: z
    .array(z.object({ categoryName: z.string() }))
    .min(1, "at least one category required"),
});

export type noteSchemaInput = z.infer<typeof noteSchema>;
