import { z } from "zod";
export const userSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().min(3, "Invalid email address"),
});
