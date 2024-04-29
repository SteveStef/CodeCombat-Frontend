/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        '2md': '56rem', // This is twice the size of max-w-md
      },
      width: {
        '128': '32rem',
      }
    }
  },
  plugins: [],
}

