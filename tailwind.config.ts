import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Kinship & Comfort design tokens
        primary: "#031635",
        "on-primary": "#ffffff",
        "primary-container": "#1a2b4b",
        "on-primary-container": "#8293b8",
        "inverse-primary": "#b6c6ef",
        "primary-fixed": "#d8e2ff",
        "primary-fixed-dim": "#b6c6ef",
        "on-primary-fixed": "#081b3a",
        "on-primary-fixed-variant": "#364768",
        secondary: "#106d20",
        "on-secondary": "#ffffff",
        "secondary-container": "#9df898",
        "on-secondary-container": "#1a7425",
        "secondary-fixed": "#9df898",
        "secondary-fixed-dim": "#82db7e",
        "on-secondary-fixed": "#002204",
        "on-secondary-fixed-variant": "#005312",
        tertiary: "#241300",
        "on-tertiary": "#ffffff",
        "tertiary-container": "#402600",
        "on-tertiary-container": "#cd8300",
        "tertiary-fixed": "#ffddb8",
        "tertiary-fixed-dim": "#ffb95f",
        "on-tertiary-fixed": "#2a1700",
        "on-tertiary-fixed-variant": "#653e00",
        error: "#ba1a1a",
        "on-error": "#ffffff",
        "error-container": "#ffdad6",
        "on-error-container": "#93000a",
        surface: "#fcf9f8",
        "surface-dim": "#dcd9d9",
        "surface-bright": "#fcf9f8",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f6f3f2",
        "surface-container": "#f0eded",
        "surface-container-high": "#eae7e7",
        "surface-container-highest": "#e4e2e1",
        "on-surface": "#1b1c1c",
        "on-surface-variant": "#44474e",
        "inverse-surface": "#303030",
        "inverse-on-surface": "#f3f0f0",
        outline: "#75777f",
        "outline-variant": "#c5c6cf",
        "surface-tint": "#4e5e81",
        "surface-variant": "#e4e2e1",
        background: "#fcf9f8",
        "on-background": "#1b1c1c",
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        sm: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1.5rem",
        full: "9999px",
      },
      spacing: {
        xs: "4px",
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "24px",
        "2xl": "32px",
        "3xl": "48px",
        "4xl": "64px",
        "layout-margin-mobile": "20px",
        "layout-margin-desktop": "80px",
        gutter: "24px",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      fontSize: {
        "display-lg": [
          "48px",
          {
            lineHeight: "56px",
            letterSpacing: "-0.02em",
            fontWeight: "700",
          },
        ],
        "display-lg-mobile": [
          "36px",
          {
            lineHeight: "44px",
            letterSpacing: "-0.02em",
            fontWeight: "700",
          },
        ],
        "headline-md": [
          "30px",
          {
            lineHeight: "38px",
            letterSpacing: "-0.01em",
            fontWeight: "600",
          },
        ],
        "headline-sm": [
          "24px",
          { lineHeight: "32px", fontWeight: "600" },
        ],
        "title-lg": [
          "20px",
          { lineHeight: "28px", fontWeight: "600" },
        ],
        "body-lg": [
          "18px",
          { lineHeight: "28px", fontWeight: "400" },
        ],
        "body-md": [
          "16px",
          { lineHeight: "24px", fontWeight: "400" },
        ],
        "label-md": [
          "14px",
          {
            lineHeight: "20px",
            letterSpacing: "0.01em",
            fontWeight: "500",
          },
        ],
        "label-sm": [
          "12px",
          {
            lineHeight: "16px",
            letterSpacing: "0.05em",
            fontWeight: "600",
          },
        ],
      },
      boxShadow: {
        "level-1":
          "0px 2px 4px rgba(26, 43, 75, 0.04)",
        "level-2":
          "0px 12px 24px rgba(26, 43, 75, 0.08)",
        "level-3":
          "0px 20px 40px rgba(26, 43, 75, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
