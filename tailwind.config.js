module.exports = {
  mode: "jit",
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        dark: {
          50: "#fafafa",
          100: "#9f9f9f",
          200: '#7f7f7f',
          300: '#6f6f6f',
          400: '#5f5f5f',
          500: '#4f4f4f',
          600: '#3f3f3f',
          700: '#2f2f2f',
          800: '#1f1f1f',
          900: '#0f0f0f',
        }
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
