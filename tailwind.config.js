/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}", // ✅ Optional: covers all folders inside /src
  ],
  theme: {
    extend: {
      colors: {
        mint: {
          50: "#f0fdf6",
          100: "#ccfce7",
          200: "#99f9d3",
          300: "#66f5c0",
          400: "#33f1ac",
          500: "#00ed98",
          600: "#00be7a",
          700: "#009e65",
          800: "#007e50",
          900: "#005f3c",
        },
      },
      fontFamily: {
        urdu: ["Noto Nastaliq Urdu", "serif"], // Only if you need special Urdu font
      },
    },
  },
  plugins: [],
};
