/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        gunmetal: {
          DEFAULT: "#292F36",
          dark: "#1D2229",
        },
        turquoise: {
          DEFAULT: "#4ECDC4",
          dark: "#2AA794",
        },
        cream: {
          DEFAULT: "#F7FFF7",
          dark: "#D9F7D9",
        },
        bittersweet: {
          DEFAULT: "#FF6B6B",
          dark: "#E24E4E",
        },
        crayola: {
          DEFAULT: "#FFE66D",
          dark: "#E6C846",
        },
      },
    },
  },
  plugins: [],
}

