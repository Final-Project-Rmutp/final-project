/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
const {
  default: flattenColorPalette,
// eslint-disable-next-line no-undef
} = require("tailwindcss/lib/util/flattenColorPalette");
 
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.html,js",
    "./src/**/*.jsx",
    "./src/**/*.tsx",
    "./src/**/*.scss",
    "./src/**/*.css",
    'node_modules/preline/dist/*.js',
    "./src/**/*.{ts,tsx}"
  ],
  darkMode: "class",
  theme: {
    extend: {
      animation: {
        scroll:
          "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
      },
      keyframes: {
        scroll: {
          to: {
            transform: "translate(calc(-50% - 0.5rem))",
          },
        },
      },
  },
  plugins: [addVariablesForColors],
  }
}

function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );
 
  addBase({
    ":root": newVars,
  });
}