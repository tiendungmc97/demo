"use client";

import "@ant-design/v5-patch-for-react-19";
import type React from "react";

import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider, theme as themAlgorithm } from "antd";
import { ThemeProvider, useTheme } from "next-themes";
import { useLayoutEffect, useMemo, useState } from "react";
import { themeConfigs } from "./config";
import { Theme } from "./types";

function AntdConfigProvider({ children, initTheme }: { children: React.ReactNode, initTheme: Theme }) {
  const { theme: currentTheme } = useTheme();
  const [theme, setTheme] = useState<Theme>(initTheme);

  useLayoutEffect(() => {
    setTheme(currentTheme as Theme);
  }, [currentTheme]);

  const isDark = theme === Theme.DARK;
  const antdTheme = useMemo(
    () => ({
      algorithm: isDark ? themAlgorithm.darkAlgorithm : themAlgorithm.defaultAlgorithm,
      token: themeConfigs(isDark).token,
      components: themeConfigs(isDark).components,
    }),
    [isDark]
  );
  return <ConfigProvider theme={antdTheme}>{children}</ConfigProvider>;
}

function AntdProviders({ children, theme }: { children: React.ReactNode, theme: Theme }) {
  return (
    <ThemeProvider
      enableSystem
      storageKey="theme"
      defaultTheme="system"
      attribute="class"   
    >
      <AntdConfigProvider initTheme={theme}>{children}</AntdConfigProvider>
    </ThemeProvider>
  );
}

export function ThemeProviders({ children, theme }: { children: React.ReactNode, theme: Theme }) {
  return (
    <AntdRegistry>
      <AntdProviders theme={theme}>{children}</AntdProviders>
    </AntdRegistry>
  );
}
