"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { Language } from "@/libs/types/language";
import { useTranslations, useLocale } from "next-intl";

export function LanguageSwitcher() {
  const t = useTranslations("LanguageSwitcher");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const languages: { code: Language; name: string }[] = [
    { code: Language.EN, name: t("english") },
    { code: Language.VI, name: t("vietnamese") },
  ];

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = event.target.value as Language;
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div>
      <select
        onChange={handleLanguageChange}
        value={locale}
        className="select select-bordered select-sm w-full max-w-xs"
      >
        {languages.map((language) => (
          <option
            key={language.code}
            className={locale === language.code ? "bg-accent" : ""}
            value={language.code}
          >
            {language.name}
          </option>
        ))}
      </select>
    </div>
  );
}
