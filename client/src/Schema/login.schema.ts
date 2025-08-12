import { z } from "zod";

const loginSchema = z.object({
  email: z.email().min(1, "Email is required"),
  password: z.string().min(4, "At least 4 characters are required"),
});

type loginInputSchema = z.infer<typeof loginSchema>;

export type { loginInputSchema };

export { loginSchema };
