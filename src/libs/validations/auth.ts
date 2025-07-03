import { z } from "zod";
const t = (key: string) => key;
export const passwordSchema = (t: (key: string) => string) =>
  z
    .string()
    .min(8, { message: t("validation:minLengthErrorMessage") })
    .max(20, { message: t("validation:maxLengthErrorMessage") })
    .refine((password) => /[A-Z]/.test(password), {
      message: t("validation:uppercaseErrorMessage"),
    })
    .refine((password) => /[a-z]/.test(password), {
      message: t("validation:lowercaseErrorMessage"),
    })
    .refine((password) => /[0-9]/.test(password), {
      message: t("validation:numberErrorMessage"),
    })
    .refine((password) => /[!@#$%^&*]/.test(password), {
      message: t("validation:specialCharacterErrorMessage"),
    });
