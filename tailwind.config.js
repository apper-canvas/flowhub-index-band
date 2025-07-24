/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#5B21B6",
        "primary-dark": "#4C1D95",
        secondary: "#7C3AED",
        accent: "#F59E0B",
        "accent-dark": "#D97706",
        success: "#10B981",
        warning: "#F59E0B",
        error: "#EF4444",
        info: "#3B82F6",
        surface: "#FFFFFF",
        background: "#F9FAFB"
      },
      fontFamily: {
        display: ["Plus Jakarta Sans", "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"]
      },
      animation: {
        "shimmer": "shimmer 2s linear infinite",
        "pulse-subtle": "pulse-subtle 2s ease-in-out infinite"
      },
      keyframes: {
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" }
        },
        "pulse-subtle": {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.8 }
        }
      }
    }
  },
  plugins: []
};