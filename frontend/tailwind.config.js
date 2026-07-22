/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "system-ui", "sans-serif"],
        heading: ["Montserrat", "Poppins", "system-ui", "sans-serif"],
      },
      colors: {
        background: "#0D0D0D",
        secondary: "#1A1A1A",
        cream: "#F8F4EC",
        gold: {
          200: "#E7B845",
          300: "#D4AF37",
          400: "#B88F22",
          500: "#8E6818",
        },
        primary: {
          50: "#EEEDFE",
          100: "#CECBF6",
          200: "#AFA9EC",
          400: "#7F77DD",
          600: "#534AB7",
          700: "#3C3489",
          900: "#26215C",
        },
      },
      boxShadow: {
        luxury: "0 24px 80px rgba(0, 0, 0, 0.45)",
        gold: "0 0 28px rgba(212, 175, 55, 0.22)",
        "gold-lg": "0 0 44px rgba(231, 184, 69, 0.38)",
      },
    },
  },
  plugins: [],
};
