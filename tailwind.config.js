/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        saffron: {
          50: '#FFF8F0',
          100: '#FFECD4',
          200: '#FFD4A8',
          300: '#FFB76B',
          400: '#FF9A3E',
          500: '#E8722A',
          600: '#C45A1C',
          700: '#9D4215',
          800: '#7A3412',
          900: '#5C280E'
        },
        forest: {
          50: '#F0F7F0',
          100: '#D4ECD4',
          200: '#A8D9A8',
          300: '#6BBF6B',
          400: '#3EA63E',
          500: '#2E7D32',
          600: '#246324',
          700: '#1B4A1B',
          800: '#123212',
          900: '#0A1A0A'
        },
        gold: {
          50: '#FFFDF5',
          100: '#FEF7E0',
          200: '#FCEDB8',
          300: '#F9DE82',
          400: '#E8C55A',
          500: '#D4A843',
          600: '#B8922F',
          700: '#96741F',
          800: '#745813',
          900: '#523D0B'
        },
        cream: {
          50: '#FFFEFA',
          100: '#FFFDF5',
          200: '#FFF8E7',
          300: '#FFF0D0',
          400: '#FFE4B0',
          500: '#F5D48E'
        },
        charcoal: {
          700: '#2D2D2D',
          800: '#1A1A1A',
          900: '#0F0F0F',
          950: '#0A0A0A'
        }
      },
      fontFamily: {
        heading: ['Playfair Display', 'serif'],
        body: ['Poppins', 'sans-serif'],
        gujarati: ['Noto Sans Gujarati', 'Poppins', 'sans-serif']
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'ken-burns': 'kenBurns 20s ease-in-out infinite alternate'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(232,114,42,0.4)' },
          '50%': { boxShadow: '0 0 20px rgba(232,114,42,0.8), 0 0 40px rgba(232,114,42,0.4)' }
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' }
        },
        kenBurns: {
          '0%': { transform: 'scale(1) translate(0, 0)' },
          '100%': { transform: 'scale(1.1) translate(-2%, -1%)' }
        }
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
};
