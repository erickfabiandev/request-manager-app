import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        'mobile': '375px',
        'tablet': '768px',
        'laptop': '1280px',
        'desktop': '1440px',
      },
      colors: {
        primary: '#C8102E',
        secondary: '#1A1A2E',
        accent: '#F5A623',
      },
    },
  },
  plugins: [],
}

export default config