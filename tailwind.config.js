/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        dmsans: ["DM Sans", "sans-serif"],
      },
      colors: {
        primary: "#007E85",
        secondry: "#ECECEC",
        "text-headers": "#191919",
        "color-border": "#D4D2E3",
        "btn-color": "#0FE3AF",
        "coral-red": "#CBF901",
        "slate-gray": "#6D6D6D",
        "pale-blue": "#F5F6FF",
        "white-400": "rgba(255, 255, 255, 0.80)",
      },
      aspectRatio: {
        "3/2": "3 / 2",
        "3/4": "4 / 5",
      },
    },
  },
  plugins: [],
};
