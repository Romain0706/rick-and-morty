const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      'white': '#FFFFFF',
      'blue': '#16afc8',
    },
    extend: {
      fontFamily: {
        'schwifty': ['GetSchwifty', ...defaultTheme.fontFamily.sans],
      },
      backgroundImage: {
        'portal': "url('/images/portal.png')",
      },
    },
  },
  plugins: [],
}
