/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    colors: {
      'pure-black': '#000',
      blue: '#1DA1F2',
      'blue-light': '#e0eaf3',
      black: '#000',
      white: '#FFFFFF',
      'dark-gray': '#657786',
      'light-gray': '#AAB8C2',
      'x-light-gray': '#E1E8ED',
      'xx-light-gray': '#F5F8FA',
      'border-gray': '#2f3336',
      'light-thin': '#71767b',
      warning: '#F4212E',
    },
    fontFamily: {
      sans: ['roboto', 'Helvetica', 'Arial'],
    },
  },
  plugins: [],
};
