/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        scroll:
          "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
      },
      fontFamily : {
        Unbounded : ["Unbounded"]
      },
      keyframes: {
        scroll: {
          to: {
            transform: "translate(calc(-50% - 1rem))",
          },
        },
      },
      screens: {
        '1000px': '1000px',
        '1100px': '1100px',
        '1200px': '1200px',
        '1300px': '1300px',
        '1500px': '1500px',
        '1400px': '1400px',
        '800px': '800px',
        '400px': '400px',
      },
      
    },
  },
  plugins: [addVariablesForColors],
}

// Assuming flattenColorPalette is defined elsewhere or you have to define it
function flattenColorPalette(colorPalette) {
  // Placeholder implementation - you should replace this with actual logic
  return colorPalette;
}

function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}