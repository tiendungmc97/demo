"use client";

import { Link } from "@/i18n/navigation";
import { Button } from "antd";
import { signOut, useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "./language-switcher";
import { ThemeToggle } from "./theme-toggle";

export function Navigation() {
  const t = useTranslations("Navigation");
  const user = useSession();
  const navItems = [
    { href: "/", label: t("home") },
    { href: "/signin", label: t("signin") },
  ];

  return (
    <nav className="bg-background/95 supports-[backdrop-filter]:bg-background/60 border-b backdrop-blur">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link
              href="/"
              className="text-xl font-bold"
            >
              Next.js i18n
            </Link>

            <div className="hidden items-center space-x-6 md:flex">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {/* <ThemeToggle /> */}
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </nav>
  );
}
