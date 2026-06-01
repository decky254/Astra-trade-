/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#040814',      // Deep space base background
        surface: '#0D1222',     // Primary card layers
        nested: '#070A14',      // Input containers and footer navbar
        brand: '#4446E4',       // Tech-neon indigo accent
        bullish: '#00C896',     // Emerald profit state
        bearish: '#FF453A',     // Coral loss state
        capped: '#FFB300',      // Amber capped/alert limit state
      }
    },
  },
  plugins: [],
}
