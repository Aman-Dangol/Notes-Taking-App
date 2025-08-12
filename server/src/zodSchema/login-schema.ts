import { z } from "zod";

/**
 * Schema for validating login data.
 * It requires an email and a password.
 */
const loginSchema = z.object({
  email: z.email().min(1),
  password: z.string().min(4),
});

type loginData = z.infer<typeof loginSchema>;

export type { loginData };
export { loginSchema as loginSchema };
