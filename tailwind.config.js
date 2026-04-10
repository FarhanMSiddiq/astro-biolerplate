// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{astro,html,js,jsx,ts,tsx}", // Pastikan ini mencakup semua file yang relevan
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'), 
  ],
  daisyui: {
    themes: ["light"],
  },
}
