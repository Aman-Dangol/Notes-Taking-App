import { z } from "zod";

const registerSchema = z.object({
  email: z.email().min(1, "field is required"),
  userName: z.string().min(1, "field is required"),
  password: z.string().min(4, "required atleast 4 characters"),
});

type registerInputSchema = z.infer<typeof registerSchema>;

export type { registerInputSchema };

export { registerSchema };
