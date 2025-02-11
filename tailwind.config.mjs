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
      // TODO: Add custom colors
      colors: {
        primary: {
          base: '#ffedff',
          dark: '#6c0089',
        },
        secondary: {
          base: '#b200e3',
          dark: '#24002e',
        },
        accent: {
          base: '#91e600',
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
