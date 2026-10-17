/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          // Matches BS_Website_FINAL_LIVE.html palette
          gold: '#D4A017',
          goldDark: '#A07810',
          gold2: '#F5A623',
          gold3: '#FBBC2E',
          ink: '#060606',
          inkSoft: '#0d0d0d',
          inkCard: '#1a1a1a',
        },
        // ROSEMARY.BH storefront (/rosemary) — botanical, light-first palette,
        // deliberately unlike the Builders Solutions gold-on-black.
        leaf: {
          50: '#f2f7f1',
          100: '#e0ebdd',
          200: '#c2d8bd',
          300: '#98bc91',
          400: '#6d9c66',
          500: '#4c7f47',
          600: '#396635',
          700: '#2d512c',
          800: '#254124',
          900: '#1d331e',
          950: '#0f1c10',
        },
        sprig: {
          ink: '#12180f',
          paper: '#fbfaf5',
          stone: '#e8e5da',
          clay: '#b66b3f',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Bebas Neue', 'sans-serif'],
        mono: ['var(--font-mono)', 'JetBrains Mono', 'monospace'],
        sans: ['var(--font-body)', 'DM Sans', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        ticker: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        fadeUp: { '0%': { opacity: '0', transform: 'translateY(16px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
        ticker: 'ticker 40s linear infinite',
        fadeUp: 'fadeUp 0.6s ease-out both',
      },
    },
  },
  plugins: [],
}
