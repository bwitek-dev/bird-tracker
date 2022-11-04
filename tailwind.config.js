/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      gridTemplateRows: {
        'layout': 'auto minmax(0, 1fr)',
      }
    },
  },
  plugins: [],
}
