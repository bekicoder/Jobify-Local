/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",      // App Router pages
    "./pages/**/*.{js,ts,jsx,tsx}",    // optional, if using Pages Router
    "./components/**/*.{js,ts,jsx,tsx}" // your components folder
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
