import type { Config } from 'tailwindcss';

// Palette ratio: yellow 60 / black 20 / white 10 / blue 5 / grey 5
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        sun: '#FFD400', // TODO: swap for the exact MDP yellow
        ink: '#0B0B0B',
        paper: '#FFFFFF',
        cobalt: '#1F4FD8', // TODO: swap for the exact MDP blue
        ash: '#8A8A85', // borders only, fails contrast as text
        'ash-text': '#5F5F5B', // grey for text on white
      },
      fontFamily: {
        latin: ['"Archivo Variable"', 'Archivo', 'system-ui', 'sans-serif'],
        thaana: ['"Democrats Akuru"', '"Baabu"', '"Noto Sans Thaana"', 'serif'],
        'thaana-body': ['"Baabu"', '"Democrats Akuru"', '"Noto Sans Thaana"', 'serif'],
      },
    },
  },
  plugins: [],
};

export default config;
