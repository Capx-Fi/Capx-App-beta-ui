/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')


module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {

      colors: {
        'cgreen-100': '#F5FFF5',
        'cgreen-200': '#D9EDDE',
        'cgreen-300': '#8FC175',
        'cgreen-400': '#3A906C',
        'cgreen-500': '#1F7A55',
        'cgreen-600': '#195F56',
        'cgreen-700': '#153945',
      },

      fontFamily: {
       sans: ["'Satoshi'", ...defaultTheme.fontFamily.sans ],
      },


    },
  },
  plugins: [],
};
