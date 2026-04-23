/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './dist/**/*.html',
    './build.js'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#d97706',
        'primary-dark': '#b45309',
        'primary-light': '#f59e0b',
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
