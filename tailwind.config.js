/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        carnival: {
          purple: '#2e1065', // Deep purple
          pink: '#ec4899', // Bright pink/magenta
          gold: '#fbbf24', // Gold
          red: '#ef4444', // Red for tent stripes
          light: '#fdf4ff', // Very light pinkish white
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
      },
      backgroundImage: {
        'hero-pattern': "url('/assets/hero-bg.jpg')", // Placeholder
      }
    },
  },
  plugins: [],
}
