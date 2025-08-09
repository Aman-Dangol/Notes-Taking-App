import { z } from "zod";

const loginScehma = z.object({
  email: z.email().min(1),
  password: z.string().min(4),
});

type loginData = z.infer<typeof loginScehma>;

export type { loginData };
export { loginScehma };
