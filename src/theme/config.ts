const designTokens = {
  colors: {
    primary: "#3b82f6",
    primaryHover: "#2563eb",
    primaryActive: "#1d4ed8",
    success: "#10b981",
    warning: "#f59e0b",
    error: "#ef4444",
    info: "#6366f1",
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 6,
    md: 8,
    lg: 12,
    xl: 16,
  },
  shadows: {
    sm: "0 1px 2px rgba(0, 0, 0, 0.05)",
    md: "0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)",
    lg: "0 4px 6px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.06)",
    xl: "0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)",
  },
};

export const themeConfigs = (isDark: boolean) => ({
  token: {
    // Color tokens
    colorPrimary: designTokens.colors.primary,
    colorSuccess: designTokens.colors.success,
    colorWarning: designTokens.colors.warning,
    colorError: designTokens.colors.error,
    colorInfo: designTokens.colors.info,

    // Base colors
    colorBgBase: isDark ? "#0f172a" : "#ffffff",
    colorBgContainer: isDark ? "#1e293b" : "#ffffff",
    colorBgElevated: isDark ? "#334155" : "#ffffff",
    colorBgLayout: isDark ? "#020617" : "#f8fafc",

    // Text colors
    colorTextBase: isDark ? "#f1f5f9" : "#0f172a",
    colorText: isDark ? "#e2e8f0" : "#334155",
    colorTextSecondary: isDark ? "#94a3b8" : "#64748b",
    colorTextTertiary: isDark ? "#64748b" : "#94a3b8",
    colorTextQuaternary: isDark ? "#475569" : "#cbd5e1",

    // Border colors
    colorBorder: isDark ? "#475569" : "#e2e8f0",
    colorBorderSecondary: isDark ? "#334155" : "#f1f5f9",

    // Typography
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    fontSize: 14,
    fontSizeHeading1: 32,
    fontSizeHeading2: 24,
    fontSizeHeading3: 20,
    fontSizeHeading4: 16,
    fontSizeHeading5: 14,

    // Spacing
    padding: designTokens.spacing.md,
    paddingXS: designTokens.spacing.xs,
    paddingSM: designTokens.spacing.sm,
    paddingLG: designTokens.spacing.lg,
    paddingXL: designTokens.spacing.xl,

    // Border radius
    borderRadius: designTokens.borderRadius.md,
    borderRadiusXS: designTokens.borderRadius.sm,
    borderRadiusSM: designTokens.borderRadius.sm,
    borderRadiusLG: designTokens.borderRadius.lg,

    // Shadows
    boxShadow: isDark ? "0 1px 3px rgba(0, 0, 0, 0.5), 0 1px 2px rgba(0, 0, 0, 0.3)" : designTokens.shadows.md,
    boxShadowSecondary: isDark ? "0 1px 2px rgba(0, 0, 0, 0.3)" : designTokens.shadows.sm,
  },
  components: {
    // Button theming
    Button: {
      borderRadius: designTokens.borderRadius.md,
      controlHeight: 40,
      controlHeightSM: 32,
      controlHeightLG: 48,
      fontSize: 14,
      fontWeight: 500,
      paddingInline: 16,
      paddingInlineSM: 12,
      paddingInlineLG: 20,

      // Primary button
      colorPrimary: designTokens.colors.primary,
      colorPrimaryHover: designTokens.colors.primaryHover,
      colorPrimaryActive: designTokens.colors.primaryActive,
      colorPrimaryBorder: designTokens.colors.primary,
      primaryShadow: `0 2px 4px ${designTokens.colors.primary}25`,

      // Default button
      colorBgContainer: isDark ? "#1e293b" : "#ffffff",
      colorBorder: isDark ? "#475569" : "#e2e8f0",
      colorText: isDark ? "#f1f5f9" : "#334155",
      colorTextDisabled: isDark ? "#64748b" : "#94a3b8",
      colorBgContainerDisabled: isDark ? "#0f172a" : "#f8fafc",
      colorBorderDisabled: isDark ? "#334155" : "#f1f5f9",

      // Shadows
      defaultShadow: isDark ? "0 1px 2px rgba(0, 0, 0, 0.3)" : designTokens.shadows.sm,
      dangerShadow: `0 2px 4px ${designTokens.colors.error}25`,
    },

    // Input theming
    Input: {
      borderRadius: designTokens.borderRadius.md,
      controlHeight: 40,
      controlHeightSM: 32,
      controlHeightLG: 48,
      fontSize: 14,
      paddingInline: 12,

      colorBgContainer: isDark ? "#1e293b" : "#ffffff",
      colorBorder: isDark ? "#475569" : "#e2e8f0",
      colorBorderHover: isDark ? "#64748b" : "#cbd5e1",
      colorPrimaryBorder: designTokens.colors.primary,
      colorPrimaryHover: designTokens.colors.primaryHover,
      colorText: isDark ? "#f1f5f9" : "#0f172a",
      colorTextPlaceholder: isDark ? "#64748b" : "#94a3b8",
      colorIcon: isDark ? "#94a3b8" : "#64748b",
      colorIconHover: isDark ? "#e2e8f0" : "#334155",

      boxShadow: isDark ? "0 1px 2px rgba(0, 0, 0, 0.3)" : designTokens.shadows.sm,
      activeShadow: `0 0 0 2px ${designTokens.colors.primary}33`,
    },

    // Card theming
    Card: {
      borderRadius: designTokens.borderRadius.lg,
      colorBorderSecondary: isDark ? "#334155" : "#f1f5f9",
      colorBgContainer: isDark ? "#1e293b" : "#ffffff",
      colorTextHeading: isDark ? "#f1f5f9" : "#0f172a",
      colorText: isDark ? "#e2e8f0" : "#334155",

      boxShadow: isDark ? "0 1px 3px rgba(0, 0, 0, 0.5), 0 1px 2px rgba(0, 0, 0, 0.3)" : designTokens.shadows.md,
      boxShadowHover: isDark ? "0 4px 6px rgba(0, 0, 0, 0.6), 0 2px 4px rgba(0, 0, 0, 0.4)" : designTokens.shadows.lg,

      headerBg: isDark ? "#0f172a" : "#f8fafc",
      headerHeight: 56,
      headerFontSize: 16,
      headerFontSizeSM: 14,
      bodyPadding: designTokens.spacing.lg,
      paddingLG: designTokens.spacing.lg,
    },

    // Tabs theming
    Tabs: {
      borderRadius: designTokens.borderRadius.md,
      colorBorderSecondary: isDark ? "#334155" : "#f1f5f9",
      colorBgContainer: isDark ? "#1e293b" : "#ffffff",
      colorText: isDark ? "#94a3b8" : "#64748b",
      colorTextActive: isDark ? "#f1f5f9" : "#0f172a",
      colorPrimary: designTokens.colors.primary,
      colorPrimaryHover: designTokens.colors.primaryHover,
      colorPrimaryActive: designTokens.colors.primaryActive,
      colorFillAlter: isDark ? "#0f172a" : "#f8fafc",
      itemColor: isDark ? "#94a3b8" : "#64748b",
      itemHoverColor: isDark ? "#e2e8f0" : "#334155",
      itemSelectedColor: designTokens.colors.primary,
      itemActiveColor: designTokens.colors.primaryActive,
      cardBg: isDark ? "#0f172a" : "#f8fafc",
      cardHeight: 40,
      cardPadding: `${designTokens.spacing.sm}px ${designTokens.spacing.md}px`,
      cardGutter: 4,
      titleFontSize: 14,
      titleFontSizeLG: 16,
      titleFontSizeSM: 12,
    },

    // Menu theming
    Menu: {
      colorBgContainer: isDark ? "#1e293b" : "#ffffff",
      colorText: isDark ? "#e2e8f0" : "#334155",
      colorTextSelected: designTokens.colors.primary,
      colorItemBg: "transparent",
      colorItemBgSelected: isDark ? "#334155" : "#f1f5f9",
      colorItemBgHover: isDark ? "#334155" : "#f8fafc",
      borderRadius: designTokens.borderRadius.sm,
      itemHeight: 40,
      itemPaddingInline: 16,
    },

    // Form theming
    Form: {
      labelFontSize: 14,
      labelColor: isDark ? "#e2e8f0" : "#334155",
      labelRequiredMarkColor: designTokens.colors.error,
      itemMarginBottom: 16,
    },

    // Select theming
    Select: {
      borderRadius: designTokens.borderRadius.md,
      controlHeight: 40,
      fontSize: 14,
      colorBgContainer: isDark ? "#1e293b" : "#ffffff",
      colorBorder: isDark ? "#475569" : "#e2e8f0",
      colorText: isDark ? "#f1f5f9" : "#0f172a",
      colorTextPlaceholder: isDark ? "#64748b" : "#94a3b8",
      optionSelectedBg: isDark ? "#334155" : "#f1f5f9",
      optionActiveBg: isDark ? "#475569" : "#e2e8f0",
    },

    // Modal theming
    Modal: {
      borderRadius: designTokens.borderRadius.lg,
      colorBgElevated: isDark ? "#1e293b" : "#ffffff",
      colorText: isDark ? "#e2e8f0" : "#334155",
      colorTextHeading: isDark ? "#f1f5f9" : "#0f172a",
      headerBg: isDark ? "#0f172a" : "#f8fafc",
      contentBg: isDark ? "#1e293b" : "#ffffff",
      footerBg: isDark ? "#0f172a" : "#f8fafc",
    },
  },
});
