/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#1a2744',
          light: '#243358',
          lighter: '#2d3f6b',
          dark: '#111b30',
          deeper: '#0d1526',
        },
        gold: {
          DEFAULT: '#c9a84c',
          light: '#d4b96a',
          lighter: '#e0cc96',
          dark: '#a8872d',
          pale: '#f5edd8',
          faint: 'rgba(201,168,76,0.12)',
        },
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
        sans: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'Oxygen', 'Ubuntu', 'sans-serif'],
      },
      backgroundSize: {
        '200': '200% 200%',
      },
      animation: {
        'gradient-slow': 'gradientShift 14s ease infinite',
        'fade-up': 'fadeUp 0.45s ease-out both',
        'slide-right': 'slideRight 0.4s cubic-bezier(0.16, 1, 0.3, 1) both',
        'slide-left': 'slideLeft 0.4s cubic-bezier(0.16, 1, 0.3, 1) both',
        'scale-in': 'scaleIn 0.3s ease-out both',
        'shimmer': 'shimmer 2.5s ease-in-out infinite',
        'pulse-gold': 'pulseGold 2.5s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideRight: {
          from: { opacity: '0', transform: 'translateX(32px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        slideLeft: {
          from: { opacity: '0', transform: 'translateX(-32px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.96)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(201, 168, 76, 0)' },
          '50%': { boxShadow: '0 0 24px 6px rgba(201, 168, 76, 0.25)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
      boxShadow: {
        'gold': '0 0 0 2px rgba(201, 168, 76, 0.5)',
        'gold-lg': '0 0 24px 4px rgba(201, 168, 76, 0.2)',
        'navy-lg': '0 20px 60px -12px rgba(17, 27, 48, 0.5)',
        'card': '0 4px 24px -4px rgba(17, 27, 48, 0.12)',
        'card-hover': '0 8px 36px -6px rgba(17, 27, 48, 0.2)',
      },
    },
  },
  plugins: [],
}
