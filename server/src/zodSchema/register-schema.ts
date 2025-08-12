import { z } from "zod";

/**
 * Zod schema for validating user registration data.
 * Ensures that userName and email are non-empty strings,
 * and that password is a string with a minimum length of 4 characters.
 */
const registerSchema = z
  .object({
    email: z.email().min(1, "Email is required"),
    userName: z.string().min(1, "Username is required"),
    password: z.string().min(4, "At least 4 characters are required"),
    confirmPassword: z.string().min(4, "At least 4 characters are required"),
  })
  .refine(
    (item) => {
      if (item.confirmPassword === item.password) {
        return true;
      }
      return false;
    },
    {
      path: ["confirmPassword"],
      error: "confirm password and password are not same",
    }
  );

type registerData = z.infer<typeof registerSchema>;

export type { registerData };
export { registerSchema as registerSchema };
