/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50:  '#fdfbf0',
          100: '#faf5d4',
          200: '#f5e98a',
          300: '#edd94a',
          400: '#d4af37',
          500: '#b8963a',
          600: '#9a7a2e',
          700: '#7a5f22',
          800: '#5c4519',
          900: '#3d2d0e',
        },
        noir: {
          50:  '#f5f5f5',
          100: '#e8e8e8',
          200: '#c8c8c8',
          300: '#a0a0a0',
          400: '#707070',
          500: '#484848',
          600: '#2e2e2e',
          700: '#1e1e1e',
          800: '#141414',
          900: '#0a0a0a',
          950: '#050505',
        },
        cream: {
          50:  '#fefefe',
          100: '#faf8f2',
          200: '#f5f0e4',
          300: '#ede4cc',
          400: '#ddd0ae',
          500: '#c8b88a',
          600: '#a89468',
          700: '#876e4a',
          800: '#634e32',
          900: '#402f1c',
        },
        forest: {
          50:  '#f0f7f0',
          100: '#d4e8d4',
          200: '#a3cfa3',
          300: '#6aaa6a',
          400: '#3d8b3d',
          500: '#1e6e1e',
          600: '#155715',
          700: '#0e420e',
          800: '#082e08',
          900: '#041a04',
        }
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
        body: ['var(--font-jost)', 'system-ui', 'sans-serif'],
        accent: ['var(--font-cinzel)', 'Georgia', 'serif'],
      },
      letterSpacing: {
        widest: '0.3em',
        'ultra-wide': '0.5em',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'gold-shimmer': 'goldShimmer 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        goldShimmer: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #d4af37 0%, #f5e98a 50%, #b8963a 100%)',
        'dark-gradient': 'linear-gradient(180deg, #0a0a0a 0%, #141414 100%)',
        'hero-overlay': 'linear-gradient(180deg, rgba(5,5,5,0.3) 0%, rgba(5,5,5,0.7) 100%)',
      },
    },
  },
  plugins: [],
};
