/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#1b110b', cocoa: '#2a1b12', choc: '#3f2a1c', caramel: '#a8825d', cream: '#f6f0e4', paper: '#fbf8f0',
      },
      fontFamily: {
        serif: ['"Playfair Display Variable"', 'Georgia', 'serif'],
        sans: ['"Montserrat Variable"', 'system-ui', 'sans-serif'],
        script: ['"Dancing Script"', 'cursive'],
      },
    },
  },
  plugins: [],
};
