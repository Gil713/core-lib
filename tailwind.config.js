// https://github.com/tailwindlabs/tailwindcss/blob/main/stubs/config.full.js

const animate = require("tailwindcss-animate");
const aspectRatio = require("@tailwindcss/aspect-ratio");
const scrollbar = require("tailwind-scrollbar");

/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  darkMode: ["class"],
  safelist: ["dark"],
  prefix: "",
  content: ["./pages/**/*.{ts,tsx,vue}", "./components/**/*.{ts,tsx,vue}"],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    fontFamily: {
      nunito: "NunitoSans, sans-serif",
      montserrat: "Montserrat",
      utm: "UTMCopperplate",
    },
    colors: {
      text: {
        placeholder: "#CCCCCC",
        error: {
          primary: "#FF4A2B",
        },
        primary: "#E9ECF2",
        secondary: "#B0B6BF",
        money: "#f48b13",
        fgSuccessPrimary: "#1CB968",
        fgSecondary: "#CCCCCC",
        tooltip: "#4C4C4C",
      },
      border: {
        warning: "#f48b13",
        tertiary: "#06060600",
      },
      description: "#C5C8D4",
      background: {
        pc: "#181a1c",
        popup: {
          header: "#34393D",
          body: "#18191B",
          backdrop: "rgba(6, 6, 6, 0.80)",
          overlay: "#060606CC",
        },
        bg: {
          section_main: "#292D30",
          secondary: "#ffffff0d",
          primary: "#0606060d",
        },
        disable: "#FFFFFF1F",
        menu: {
          account: "#292D30",
        },
        secondary: "#ffffff0c",
      },
      red: {
        noti: "#D20C3C",
      },
      black: "#0b030e",
      white: "#ffffff",
      neutral: {
        50: "#e9ecf2",
        100: "#ccd1d9",
        200: "#b0b6bf",
        300: "#8a9099",
        400: "#6e7680",
        500: "#585e66",
        600: "#42474d",
        700: "#2e3236",
        750: "#232629",
        800: "#181a1c",
        900: "#060809",
      },
      primary: {
        DEFAULT: "#F9F9F9",
        100: "#9ec2eb",
        200: "#6ea3e0",
        300: "#2189ff",
        400: "#0d66cc",
        500: "#0a43a0",
      },
      secondary: {
        DEFAULT: "#F48B13",
        100: "#fff5e5",
        200: "#ffe2b2",
        300: "#ffc466",
        400: "#ffa71a",
        500: "#da8b0b",
        foreground: "#cccccc",
      },
      positive: {
        400: "#00ab55",
        500: "#49BE47",
      },
      negative: {
        400: "#ff6966",
        500: "#ff4a2b",
      },
      warning: {
        DEFAULT: "#F48B13",
        200: "#fbc16c",
        300: "#f4b070",
        400: "#feb94a",
      },
      disable: {
        DEFAULT: "#999999",
      },
      promotion: {
        "package-1": "#176C49",
        "package-2": "#062873",
        "package-5": "#BD7201",
        "package-8": "#8E1800",
      },
      history: {
        finished: "#11A95D",
        cancel: "#FF4A2B",
        processing: "#F48B13",
        bgFinished: "rgba(17, 169, 93, 0.1)",
        bgCancel: "rgba(255, 74, 43, 0.1)",
        bgProcessing: "rgba(244, 139, 19, 0.1)",
        bgReject: "#FFFFFF0D",
      },
    },
    fontSize: {
      noti: ["10px"],
      "2xs": ["10px", { lineHeight: "14px" }],
      xs: ["0.75rem", { lineHeight: "1rem" }],
      sm: ["0.875rem", { lineHeight: "1.25rem" }],
      base: ["1rem", { lineHeight: "1.5rem" }],
      lg: ["1.125rem", { lineHeight: "1.75rem" }],
      xl: ["1.25rem", { lineHeight: "1.75rem" }],
      "2xl": ["1.5rem", { lineHeight: "2rem" }],
      "3xl": ["1.75rem", { lineHeight: "2.25rem" }],
      "4xl": ["1.875rem", { lineHeight: "2.25rem" }],
      "5xl": ["2rem", { lineHeight: "2.5rem" }],
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "16px",
      },
      screens: {
        lg: "1312px",
      },
    },
    screens: {
      sm: "604px",
      md: "784px",
      lg: "1016px",
      xl: "1312px",
    },
    extend: {
      // TODO: apply POM pattern
      zIndex: {
        image: 10,
        "image-placeholder": 15,
        "image-spinner": 20,
        "image-overlay": 40,
        "image-top": 50,
        footer: 1000,
        header: 1200,
        modal: 1300,
        toast: 1400,
        sheet: 1500,
        popover: 1600,
        100: "100",
        200: "200",
        300: "300",
        400: "400",
        500: "500",
        600: "600",
        700: "700",
        800: "800",
        900: "900",
        1000: "1000",
        1100: "1100",
        1200: "1200",
      },
      colors: {
        tab: {
          mainMenu: {
            fgActive: "#2189FF",
          },
          money: {
            fgActive: "#E9ECF2",
            bgInactive: "#FFFFFF29",
            bgActive: "#FFFFFF29",
          },
          payment: {
            borderActive: "#2189FF",
            borderInactive: "#FFFFFF1A",
            bgActive: "#FFFFFF0D",
            bgInactive: "#FFFFFF0D",
            bgDisabled: "#FFFFFF1A",
            fgActive: "#2189FF",
            fgInactive: "#FFFFFF",
            fgDisabled: "#6E7680",
          },
          news: {
            bgInactive: "#34393D",
          },
        },
        border: {
          DEFAULT: "hsl(var(--border))",
          primary: "#FFFFFF1A",
          error: "#FF4A2B",
        },
        input: {
          bg: "#FFFFFF0D",
          border: "#FFFFFF1F",
          focus: {
            bg: "#0D66CC0D",
            border: "#2189FF",
          },
          disabled: {
            bg: "#FFFFFF1A",
            border: "#FFFFFF1A",
          },
        },
        ring: "hsl(var(--ring))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#e9ecf2",
          foreground: "hsl(var(--primary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      borderWidth: {
        0.5: "0.5px",
      },
      borderColor: {
        transparent: "transparent",
      },
      outlineColor: {
        transparent: "transparent",
      },
      keyframes: {
        "marquee-slide": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        fadeIn: {
          "0%": { opacity: 0, transform: "translateX(-10px)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "collapsible-down": {
          from: { height: 0 },
          to: { height: "var(--radix-collapsible-content-height)" },
        },
        "collapsible-up": {
          from: { height: "var(--radix-collapsible-content-height)" },
          to: { height: 0 },
        },
        "loading-skeleton": {
          from: { opacity: 0.4 },
          to: { opacity: 1 },
        },
        "fade-in-out": {
          "0%, 100%": {
            opacity: 1,
          },
          "50%": {
            opacity: 0,
          },
        },
        "slide-in": {
          "0%": {
            opacity: 0,
            transform: "translateY(-50%) translateX(100%)",
          },
          "100%": {
            opacity: 1,
            transform: "translateY(-50%) translateX(0)",
          },
        },
        "slide-out": {
          "0%": {
            opacity: 1,
            transform: "translateY(-50%) translateX(0)",
          },
          "100%": {
            opacity: 0,
            transform: "translateY(-50%) translateX(100%)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "collapsible-down": "collapsible-down 0.2s ease-in-out",
        "collapsible-up": "collapsible-up 0.2s ease-in-out",
        "loading-skeleton": "loading-skeleton 1s infinite alternate",
        "fade-in-out": "fade-in-out 1.5s ease-in-out infinite",
        "fade-in-out-delayed": "fade-in-out 1.5s ease-in-out infinite",
        "marquee-slide": "marquee-slide 50s linear infinite",
        "fade-in": "fadeIn ease 0.6s",
        "slide-in": "slide-in 0.3s linear",
        "slide-out": "slide-out 0.3s linear forwards",
      },
      backgroundImage: {
        "custom-gradient-1": "linear-gradient(251.27deg, #00539C 1.4%, #121317 97.61%)",
        "custom-gradient-2": "linear-gradient(251.27deg, #008A9A 1.4%, #121317 97.61%)",
        "custom-gradient-3": "linear-gradient(251.27deg, #985621 0.69%, #121317 99.21%)",
        "custom-gradient-4": "linear-gradient(251.27deg, #3E209A 1.4%, #121317 97.61%)",
        "custom-gradient-5": "linear-gradient(90deg, #1A349C 0%, #399FD8 100%)",
        "custom-gradient-6": "linear-gradient(90deg, #6E6E6E66 0%, #757575AD 50.53%, #6E6E6E6B 100%)",
        "custom-gradient-7":
          "linear-gradient(90deg, rgba(70, 72, 23, 0.2) -38.13%, rgba(155, 158, 60, 0.1) 39.25%, rgba(70, 72, 23, 0.4) 104.67%)",
        "custom-gradient-8": "linear-gradient(214.94deg, #34393D -101.44%, #42474D 109.81%)",
        "custom-gradient-account-overview":
          "linear-gradient(180deg, rgba(57, 159, 216, 0.70) 0%, rgba(26, 52, 156, 0.70) 100%)",
        "custom-gradient-popup-verify-email":
          "linear-gradient(90deg, rgba(102, 117, 146, 0.00) 0%, rgba(102, 117, 146, 0.12) 51.73%, rgba(102, 117, 146, 0.00) 103.45%)",
      },
      gridTemplateColumns: {
        inherit: "inherit",
        "account-layout-v1": "320px 1fr",
        "account-layout-v2": "1fr 528px",
      },
      opacity: {
        7: "0.07",
        12: "0.12",
      },
      gap: {
        inherit: "inherit",
      },
      height: {
        account: "666px",
      },
      minHeight: {
        account: "666px",
      },
      maxWidth: {
        account: "1280px",
      },
      aspectRatio: {
        "img-promotion": "410 / 139",
      },
      boxShadow: {
        rateOdds: "0px 4px 4px 0px rgba(0, 0, 0, 0.04)",
      },
    },
  },
  corePlugins: {
    aspectRatio: true,
  },
  plugins: [aspectRatio, animate, scrollbar],
};
