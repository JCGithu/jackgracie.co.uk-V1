module.exports = {
  purge: {
    enabled: true,
    content: ['./**/*.html'],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      display: ['Poppins', 'system-ui', 'sans-serif'],
      body: ['Poppins', 'system-ui', 'sans-serif'],
      sunflower: ['sunflower', 'sans-serif'],
    },
    container: {
      center: true,
      padding: '2rem',
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
