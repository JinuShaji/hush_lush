/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#E52E2E',
          hover: '#C81E1E',
          light: '#FEE2E2',
          subtle: '#FFF5F5',
        },
        brand: {
          red: '#E52E2E',
          dark: '#1A1A1A',
          muted: '#64748B',
          border: '#E2E8F0',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        script: ['"Dancing Script"', '"Great Vibes"', 'cursive'],
        sans: ['"Inter"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'nav': '0 -4px 20px rgba(0, 0, 0, 0.04)',
      }
    },
  },
  plugins: [],
}
