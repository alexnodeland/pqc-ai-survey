/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    // Dynamic color classes used in the component
    {
      pattern: /(bg|text|border|ring|shadow)-(slate|emerald|violet|sky|amber|rose|orange|red|purple|cyan|pink|neon)-(50|100|200|300|400|500|600|700|800|900|950|cyan|magenta|green|amber|red)/,
      variants: ['hover', 'group-hover'],
    },
    {
      pattern: /(from|to|via)-(slate|emerald|violet|sky|amber|rose|orange|red|purple|cyan|pink|neon)-(50|100|200|300|400|500|600|700|800|900|950|cyan|magenta|green|amber|red)/,
    },
    // Neon color classes for AlgorithmBadge
    'text-neon-cyan', 'text-neon-magenta', 'text-neon-green', 'text-neon-amber', 'text-neon-red',
    'border-neon-cyan/30', 'border-neon-magenta/30', 'border-neon-green/30', 'border-neon-amber/30', 'border-neon-red/30',
    'border-neon-cyan/40', 'border-neon-magenta/40', 'border-neon-green/40', 'border-neon-amber/40', 'border-neon-red/40',
    'border-neon-cyan/60', 'border-neon-magenta/60', 'border-neon-green/60', 'border-neon-amber/60', 'border-neon-red/60',
    'hover:border-neon-cyan/60', 'hover:border-neon-magenta/60', 'hover:border-neon-green/60', 'hover:border-neon-amber/60', 'hover:border-neon-red/60',
    'bg-neon-cyan/10', 'bg-neon-magenta/10', 'bg-neon-green/10', 'bg-neon-amber/10', 'bg-neon-red/10',
    // Neon shadow classes
    'shadow-neon-cyan',
    'shadow-neon-magenta',
    'shadow-neon-green',
    'shadow-neon-amber',
    'shadow-neon-red',
    'shadow-neon-cyan-lg',
    'shadow-neon-magenta-lg',
    'shadow-neon-green-lg',
    'hover:shadow-neon-cyan',
    'hover:shadow-neon-magenta',
    'hover:shadow-neon-green',
    'hover:shadow-neon-amber',
    'hover:shadow-neon-red',
    'hover:shadow-neon-cyan-lg',
  ],
  theme: {
    extend: {
      colors: {
        neon: {
          cyan: '#00f5ff',
          magenta: '#ff00ff',
          green: '#39ff14',
          amber: '#ffb800',
          red: '#ff073a',
        },
        dark: {
          900: '#050810',
          800: '#0a0f1a',
          700: '#0f1629',
          600: '#1a2340',
        }
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Space Mono"', 'monospace'],
        display: ['Orbitron', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.05em' }],
        'sm': ['0.875rem', { lineHeight: '1.5', letterSpacing: '0.03em' }],
        'base': ['1rem', { lineHeight: '1.6', letterSpacing: '0.02em' }],
      },
      boxShadow: {
        'neon-cyan': '0 0 5px #00f5ff, 0 0 20px rgba(0,245,255,0.4)',
        'neon-cyan-lg': '0 0 10px #00f5ff, 0 0 30px rgba(0,245,255,0.5), 0 0 60px rgba(0,245,255,0.2)',
        'neon-magenta': '0 0 5px #ff00ff, 0 0 20px rgba(255,0,255,0.4)',
        'neon-magenta-lg': '0 0 10px #ff00ff, 0 0 30px rgba(255,0,255,0.5), 0 0 60px rgba(255,0,255,0.2)',
        'neon-green': '0 0 5px #39ff14, 0 0 20px rgba(57,255,20,0.4)',
        'neon-green-lg': '0 0 10px #39ff14, 0 0 30px rgba(57,255,20,0.5), 0 0 60px rgba(57,255,20,0.2)',
        'neon-amber': '0 0 5px #ffb800, 0 0 20px rgba(255,184,0,0.4)',
        'neon-red': '0 0 5px #ff073a, 0 0 20px rgba(255,7,58,0.4)',
        'neon-red-lg': '0 0 10px #ff073a, 0 0 30px rgba(255,7,58,0.5), 0 0 60px rgba(255,7,58,0.2)',
        'inner-glow': 'inset 0 0 20px rgba(0,245,255,0.1)',
      },
      animation: {
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'flicker': 'flicker 0.15s infinite',
        'scan': 'scan 4s linear infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        'flicker': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.95' },
        },
        'scan': {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '0 100%' },
        },
      },
      borderWidth: {
        '1': '1px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'grid-pattern': 'linear-gradient(rgba(0,245,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,0.05) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
}
