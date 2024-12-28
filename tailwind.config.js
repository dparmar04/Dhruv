/** @type {import('tailwindcss').Config} */
export default {
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
            'shine': 'shine 5s linear infinite', // Add shine animation
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
         },
      },
   },
   plugins: [require('tailwind-scrollbar-hide')],
}
