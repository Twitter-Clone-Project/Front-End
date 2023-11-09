/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    colors: {
      'pure-black': "#000",
      blue: "#1DA1F2",
      black: "#14171A",
      white: "#FFFFFF",
      "dark-gray": "#657786",
      "light-gray": "#AAB8C2",
      "x-light-gray": "#E1E8ED",
      "xx-light-gray": "#F5F8FA",
      "dark-layout": "#292e33",
      'border-gray': "#2f3336",
      'light-thin': "#71767b",
      'hover-layout': '#e7e9ea1a',
      warning: "#F4212E",
      "transparent": "#00000000",
    },
    fontFamily: {
      'sans': ['roboto', 'Helvetica', 'Arial']
    }
  },
  plugins: [],
};
