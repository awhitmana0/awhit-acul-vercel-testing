/** @type {import('tailwindcss').Config} */
export default {
  // Specify files where Tailwind should look for classes
  content: [
    "./index.html",
    "./public/**/*.html", // Include public HTML files
    "./src/**/*.{js,ts,jsx,tsx}", // Include all JS/TS/JSX/TSX files in src
    // Add paths for shadcn/ui components if they are in a specific folder
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Custom theme extensions, e.g., custom colors, fonts
      fontFamily: {
        inter: ['Inter', 'sans-serif'], // Add Inter font
      },
    },
  },
  plugins: [
    require("tailwindcss-animate") # Required for Shadcn/ui animations
  ],
}
