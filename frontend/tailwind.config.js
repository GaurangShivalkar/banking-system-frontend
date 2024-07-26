/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    
  ],
  theme: {
    extend: {
      backgroundImage: {
        'theme-image': "url('src/images/BgImage2.jpg')"
      }
    },
  },
  plugins: [],
}
