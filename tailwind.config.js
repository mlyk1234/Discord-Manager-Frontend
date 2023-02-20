/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'dfa': '#18191A',
        'framer': '#141415',
        'dfa-grey': '#667085',
        'dfa-grey-2': '#202124'
      },
      borderColor: {
        'dfa-grey': '#667085',
      },
      textColor: {
        'dfa-primary': '#F49634',
        'dfa-secondary': '#FF4D37F',
        'dfa-grey': '#667085'
      },
    },
  },
  plugins: [],
}
