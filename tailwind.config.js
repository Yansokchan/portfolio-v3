/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        1115: "1115px",
        550: "550px",
        517: "517px",
        474: "474px",
        460: "460px",
        440: "440px",
        400: "400px",
        394: "394px",
        375: "375px",
        310: "310px",
        220: "220px",
      },
      backdropBlur: {
        xs: "2px",
        lg: "16px",
      },
      blur: {
        xs: "2px",
        lg: "64px",
      },
      animation: {
        "gradient-pulse": "gradient-pulse 8s ease infinite",
        pulse: "pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "pulse-slow": "pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        pulse: {
          "0%, 100%": { opacity: "0.2" },
          "50%": { opacity: "0.05" },
        },
        "gradient-pulse": {
          "0%, 100%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
        },
      },
    },
  },
  plugins: [],
};
