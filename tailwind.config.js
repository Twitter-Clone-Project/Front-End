/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        '2xl': {
          min: '1440px',
        },
        mlg: {
          min: '1280px',
        },
        xmed: {
          min: '1000px',
        },
        small: { min: '0px', max: '639px' },
      },
    },
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
      'hover-layout': '#e7e9ea1a',
      'light-hover-layout': '#62686a1a',
    },
    fontFamily: {
      sans: ['roboto', 'Helvetica', 'Arial'],
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.no-scrollbar::-webkit-scrollbar': {
          display: 'none',
        },
        '.no-scrollbar': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        },
      };
      addUtilities(newUtilities);
    },
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
};
