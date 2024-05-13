/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#040404",
        secondary: {
          DEFAULT: "#efbe0a",
          100: "#f50b2a",
          200: "#f50b2a",
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

