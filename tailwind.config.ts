import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0072CE', // Base primary color
          dark: '#003087',    // Dark primary color
        },
        secondary: {
          DEFAULT: '#F3F7FF', // Base secondary color
          dark: '#3CA4E0',    // Dark secondary color
        },
        white: '#FFFFFF',      // White color
        body: '#5C6C7B',       // Dark body color
        gray: {
          light: '#E0E0E0',    // Light gray color
        },
        text: {
          DEFAULT: '#5C6C7B',  // Default text color set to body
        },
      },
    },
  },
  plugins: [
    function ({addUtilities}:any) {
      addUtilities({
        '.font-bold': {
          fontWeight: '700',
        },
      });
    },
  ],
} satisfies Config;
