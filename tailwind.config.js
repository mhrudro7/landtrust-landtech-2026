/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        land: {
          50: '#f0fdf5',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#006a4e', // Bangladesh national green
          800: '#065f46',
          900: '#064e3b',
          950: '#022c22',
        },
        gov: {
          gold: '#c59b27',
          goldLight: '#fef3c7',
          navy: '#0f2942',
          red: '#f42a41', // Bangladesh red accent
          offwhite: '#f9fbf9',
        },
      },
      fontFamily: {
        bangla: ['"Hind Siliguri"', '"Noto Sans Bengali"', 'system-ui', 'sans-serif'],
        serif: ['"Noto Serif Bengali"', 'serif'],
      },
      boxShadow: {
        'land-card': '0 4px 20px -2px rgba(0, 106, 78, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'land-hover': '0 12px 30px -4px rgba(0, 106, 78, 0.16), 0 4px 10px -2px rgba(0, 0, 0, 0.06)',
      },
    },
  },
  plugins: [],
};
