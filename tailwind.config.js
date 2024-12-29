/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
   content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
   ],
   theme: {
      extend: {
         fontFamily: {
            space: ['"Space Grotesk"', 'sans-serif'],
         },
         animation: {
            'star-movement-bottom': 'star-movement-bottom linear infinite alternate',
            'star-movement-top': 'star-movement-top linear infinite alternate',
            'shine': 'shine 5s linear infinite',
            'toast': 'slideInOut 3s ease-in-out forwards',
         },
         keyframes: {
            'star-movement-bottom': {
               '0%': { transform: 'translate(0%, 0%)', opacity: '1' },
               '100%': { transform: 'translate(-100%, 0%)', opacity: '0' },
            },
            'star-movement-top': {
               '0%': { transform: 'translate(0%, 0%)', opacity: '1' },
               '100%': { transform: 'translate(100%, 0%)', opacity: '0' },
            },
            // Add shine keyframe here
            'shine': {
               '0%': { 'background-position': '100%' },
               '100%': { 'background-position': '-100%' },
            },
            slideInOut: {
               '0%': { opacity: '0', transform: 'translateY(20px)' },
               '10%': { opacity: '1', transform: 'translateY(0)' },
               '90%': { opacity: '1', transform: 'translateY(0)' },
               '100%': { opacity: '0', transform: 'translateY(20px)' },
            },
         },
      },
   },
   plugins: [require('tailwind-scrollbar-hide')],
}
)