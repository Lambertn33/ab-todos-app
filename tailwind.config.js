/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1e40af",

        //dark
        primaryDark: "#1f2937",
        secondaryDark: "#111827",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
