/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#161622",
        secondary: {
          DEFAULT: "#FF9C01",
          100: "#FF9001",
          200: "#FF8E01",
        },
        black: {
          DEFAULT: "#000",
          100: "#1E1E2D",
          200: "#232533",
        },
        gray: {
          100: "#CDCDE0",
        },
      },
      fontFamily: {
        extralight: ["Nunito-ExtraLight", "sans-serif"],
        light: ["Nunito-Light", "sans-serif"],
        regular: ["Nunito-Regular", "sans-serif"],
        medium: ["Nunito-Medium", "sans-serif"],
        semibold: ["Nunito-SemiBold", "sans-serif"],
        bold: ["Nunito-Bold", "sans-serif"],
        extrabold: ["Nunito-ExtraBold", "sans-serif"],
        black: ["Nunito-Black", "sans-serif"],
      },
    },
  },
  plugins: [],
};

