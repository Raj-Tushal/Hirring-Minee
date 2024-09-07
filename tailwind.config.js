/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      height: {
        'calc-screen-minus-12': 'calc(100vh - 3rem)', // Assuming 3rem is approximately 12
      },
    },
  },
  plugins: [],
}

