import { Language } from "@/shared/types/language";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: [Language.EN, Language.VI],

  // Used when no locale matches
  defaultLocale: Language.EN,
});