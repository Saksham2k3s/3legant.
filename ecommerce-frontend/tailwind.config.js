/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "#fff",
        "neutral-01-100": "#fefefe",
        "neutral-07-100": "#141718",
        darkslategray: "#474a4a",
        "neutral-04-100": "#6c7275",
        "neutral-03-100": "#e8ecef",
        mediumseagreen: "#38cb89",
        black: "#000",
        blue: "#377dff",
        "table-border-color" : "gray"
      },
      spacing: {},
      fontFamily: {
        "button-s": "Inter",
        "headline-4": "Poppins",
      },
      backgroundColor : {
        "dashboard-bg" : "#F5F6FA"
      }
    },
  },
  plugins: [],
};
