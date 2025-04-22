/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"], // update this if you use a `src` folder
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors:{
        customblue:'#003049',
        coustomwhiteblur:'rgba(255,255,255,0.5)',
      }
    },
  },
  plugins: [],
}

