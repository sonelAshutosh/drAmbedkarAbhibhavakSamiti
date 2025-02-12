/** @type {import('tailwindcss').Config} */
const tailwindConfig = {
  // darkMode: ["class"],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          base: '#ffffff',
          dark: '#333333',
        },
        secondary: {
          base: '#7ec8e3',
          dark: '#002b5b',
        },
        accent: {
          base: '#008000',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default tailwindConfig
