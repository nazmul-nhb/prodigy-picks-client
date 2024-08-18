/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'prodigy-primary': '#5780a1',
        'prodigy-secondary': '#31404b',
        'prodigyBG': '#b6d1e488',
        'navBG': '#b6d1e4c2'
      },
      fontFamily: {
        kreonSerif: '"Kreon", serif;',
        sourceSans: '"Source Sans 3", sans-serif;',
      },
    },
  },
  plugins: [
    ({ addUtilities }) => {
      const newUtilities = {
        '.scrollbar-hide': {
          'scrollbar-width': 'none', /* For Firefox */
          '-ms-overflow-style': 'none',  /* For Internet Explorer and Edge */
        },
        '.scrollbar-hide::-webkit-scrollbar': {
          'display': 'none', /* For Chrome, Safari, and Opera */
        },
        '.scrollbar-thin': {
          'scrollbar-width': 'thin', /* For Firefox */
        },
        '.scrollbar-custom': {
          'scrollbar-width': 'thin',
          'scrollbar-color': '#a0aec0 transparent',
        },
        '.scrollbar-custom::-webkit-scrollbar': {
          'width': '8px',
        },
        '.scrollbar-custom::-webkit-scrollbar-track': {
          'background': 'transparent',
        },
        '.scrollbar-custom::-webkit-scrollbar-thumb': {
          'background-color': '#a0aec0',
          'border-radius': '10px',
          'border': '3px solid transparent',
          'background-clip': 'padding-box',
        },
        '.scrollbar-custom::-webkit-scrollbar-button': {
          'display': 'none',
        },
      }

      addUtilities(newUtilities, ['responsive', 'hover'])
    }
  ],
};