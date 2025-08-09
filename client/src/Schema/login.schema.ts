import { z } from "zod";

const loginSchema = z.object({
  email: z.email().min(1, "field is required"),
  password: z.string().min(4, "required atleast 4 characters"),
});

type loginInputSchema = z.infer<typeof loginSchema>;

export type { loginInputSchema };

export { loginSchema };
