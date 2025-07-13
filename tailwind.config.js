/** @type {import('tailwindcss').Config} */
export default {
  // Specify files where Tailwind should look for classes
  content: [
    "./index.html", // Now at the root
    "./public/**/*.html", // Still include public HTML files if any other are added
    "./src/**/*.{js,ts,jsx,tsx}", // Include all JS/TS/JSX/TSX files in src
    // Explicitly include common and screens folders
    "./src/common/**/*.{js,ts,jsx,tsx}",
    "./src/screens/**/*.{js,ts,jsx,tsx}", // This will now cover login-id and other screens
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
    require("tailwindcss-animate") // Required for Shadcn/ui animations
  ],
}
