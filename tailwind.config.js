/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        tracker: {
          DEFAULT: "rgba(27, 24, 65, 1)",
        },
      },
    },
  },
  plugins: [],
};
