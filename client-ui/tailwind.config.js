/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Enable dark mode based on class
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // Added support for TypeScript files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
