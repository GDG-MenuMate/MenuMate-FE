/** @type {import('tailwindcss').Config} */
export default {
  content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FF9F38",
        accent: "#E69034",
      },
      fontFamily: {
        sans: ['Nanum Gothic', 'sans-serif'],
        jua: ['Jua', 'sans-serif'],
        madimi: ['Madimi One', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

