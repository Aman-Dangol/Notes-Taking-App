import { z } from "zod";

const registerScehma = z.object({
  userName: z.string().min(1),
  email: z.email().min(1),
  password: z.string().min(4),
});

type registerData = z.infer<typeof registerScehma>;

export type { registerData };
export { registerScehma };
