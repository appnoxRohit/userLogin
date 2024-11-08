/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // Include all JSX/TSX files
  ],
  theme: {
    extend: {
      fontFamily: {
        'dm-serif': ['"DM Serif Display"', 'serif'],
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
