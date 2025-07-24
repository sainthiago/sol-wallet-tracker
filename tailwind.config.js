/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        solana: {
          purple: '#9945FF',
          green: '#14F195',
          blue: '#00D4FF',
          dark: '#1A1A2E',
          darker: '#16213E',
        },
        neon: {
          green: '#39FF14',
          pink: '#FF10F0',
          cyan: '#00FFFF',
          yellow: '#FFFF00',
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Monaco', 'Consolas', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(153, 69, 255, 0.5)' },
          '100%': { boxShadow: '0 0 30px rgba(153, 69, 255, 0.8)' },
        }
      }
    },
  },
  plugins: [],
} 