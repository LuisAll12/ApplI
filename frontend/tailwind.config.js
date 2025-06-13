/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: "#5529ee",
        primaryLight: "#8d6eef",
        'primary-light': '#8d6eef',
        secondary: "#22c3f7",
        gray: {
          dark: {
            900: "#101721",
            800: "#161a25",
            700: "#181c28",
            600: "#1d2331",
            500: "#252837",
            400: "#2f3646"
          },
          light: {
            500: "#3f4656",
            400: "#6b7485",
            300: "#99a4b8",
            200: "#e4ecf9",
            100: "#ffffff"
          }
        },
        alert: "#58ca82",
        error: "#d04763",
        warning: "#f6d77a",
      }
    },
  },
  plugins: [],
}
