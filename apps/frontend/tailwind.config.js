/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Kanit: ["Kanit", "sans-serif"], // Add custom font
        Icon: ["Sixtyfour Convergence", "sans-serif"],
      },
      backdropBlur: {
        16: "16px", // Add custom blur value
      },
      backgroundImage: {
        "custom-radial": `radial-gradient(50% 50% at 50% 0, rgba(var(--action-background-color, 255, 255, 255), 0.8) 0, transparent 100%), hsla(0, 0%, 100%, 0.2)`,
      },
      boxShadow: {
        "search-box":
          "0 4px 4px 0 rgba(0, 0, 0, 0.3), 0 8px 12px 6px rgba(0, 0, 0, 0.15)",
      },
    },
  },
  plugins: [],
};
