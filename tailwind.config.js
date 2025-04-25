const path = require('node:path')
const content = ['./src/**/*.{html,js,ts,jsx,tsx}', path.resolve(__dirname, '../../libs/ui/src/**/*.{js,ts,jsx,tsx}')]

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content,
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
