import { z } from "zod";

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

type registerInputSchema = z.infer<typeof registerSchema>;

export type { registerInputSchema };

export { registerSchema };
