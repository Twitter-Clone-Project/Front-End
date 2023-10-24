/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    colors: {
      blue: '#1DA1F2',
      black: '#000000',
      white: '#FFFFFF',
      'dark-gray': '#657786',
      'light-gray': '#AAB8C2',
      'x-light-gray': '#E1E8ED',
      'xx-light-gray': '#F5F8FA',
      warning: '#F4212E',
    },
  },
  plugins: [],
};
