/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'selector',
  theme: {
    extend: {
      colors: {
        // Dark mode colors
        'dark-blue': 'hsl(209, 23%, 22%)',
        'very-dark-blue': 'hsl(207, 26%, 17%)',
        'white': 'hsl(0, 0%, 100%)',
        
        // Light mode colors
        'very-dark-blue-text': 'hsl(200, 15%, 8%)',
        'dark-gray': 'hsl(0, 0%, 52%)',
        'very-light-gray': 'hsl(0, 0%, 98%)',
      },
    },
  },
} 