/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        wave: {
          "0%, 100%": { height: "10px" }, // Start and end with the initial height
          "50%": { height: "50px" }, // Expand in the middle of the animation
        },
        // appear: {
        //   "0%": { opacity: "0", transform: "scale(0.5)" },
        //   "100%": { opacity: "1", transform: "scale(1)" },
        // },
      },
      animation: {
        "loading-wave": "wave 1s ease-in-out infinite", // Define the animation
        // appear: "appear 1s linear",
      },
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
        "16/9": "16 / 9",
        "4/3": "4 / 3",
      },
    },
  },
  plugins: [],
};
