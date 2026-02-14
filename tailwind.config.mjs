/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: '#0cb09a',
        dark: '#0c1929',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 6px -1px rgb(12 24 41 / 0.06), 0 2px 4px -2px rgb(12 24 41 / 0.04)',
        'card-hover': '0 10px 15px -3px rgb(12 24 41 / 0.08), 0 4px 6px -4px rgb(12 24 41 / 0.06)',
      },
    },
  },
  plugins: [],
};
