import { z } from "zod";

export const createUserSchema = (t: any) =>
  z.object({
    username: z.string().min(3, t("errors.usernameMinLength")),
    email: z.string().email(t("errors.invalidEmail")),
  });

// Legacy schema for backward compatibility (without translations)
export const userSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
});
