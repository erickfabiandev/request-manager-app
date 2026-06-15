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
        primary: { 
          DEFAULT: '#2563EB',
          subtle:    '#DBEAFE',
          emphasis:  '#1D4ED8',
          solid:     '#3B82F6'
        },
        secondary: { 
          DEFAULT: '#1A1A2E',
          subtle:    '#E0F2FE',
          emphasis:  '#0369A1',
          solid:     '#0EA5E9'
        },
        accent: { 
          DEFAULT: '#F5A623',
          light: '#FEF3DC'
        },
        success: { 
          DEFAULT: '#2F855A',
          subtle:  '#D1FAE5',
          emphasis:'#047857',
          solid:   '#10B981'
        },
        warning: { 
          DEFAULT: '#D97706',
          subtle:   '#FEF3C7',
          emphasis: '#B45309',
          solid:    '#F59E0B'
        },
        danger: { 
          DEFAULT: '#DC2626',
          subtle:   '#FEE2E2',
          emphasis: '#B91C1C',
          solid:    '#EF4444'
        },
        closed: { 
          DEFAULT: '#5C5E62',
          subtle:    '#E5E7EB',
          emphasis:  '#4B5563',
          solid:     '#6B7280'
        },
        critical:  { 
          DEFAULT: '#7C3AED',
          subtle:    '#F3E8FF',
          emphasis:  '#7E22CE',
          solid:     '#A855F7'
        },
        neutral: {
          50:  '#F8F9FB',
          100: '#F4F5F7',
          200: '#E2E4E9',
          900: '#282848',
        },
      },
    },
  },
  plugins: [],
}

export default config