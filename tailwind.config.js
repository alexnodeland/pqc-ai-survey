/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    // Dynamic color classes used in the component
    {
      pattern: /(bg|text|border|ring|shadow)-(slate|emerald|violet|sky|amber|rose|orange|red|purple|cyan|pink)-(50|100|200|300|400|500|600|700|800|900|950)/,
      variants: ['hover', 'group-hover'],
    },
    {
      pattern: /(from|to|via)-(slate|emerald|violet|sky|amber|rose|orange|red|purple|cyan|pink)-(50|100|200|300|400|500|600|700|800|900|950)/,
    },
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
