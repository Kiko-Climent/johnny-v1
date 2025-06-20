/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'text-[6vh]',
    'text-[7.5vh]',
    'text-[15.8vh]',
  ],
  theme: {
    extend: {
      screens: {
        'xxs': '330px',
      },
    },
  },
  plugins: [],
};
