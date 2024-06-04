/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.ejs"],
  theme: {
    extend: {
      colors: {
        "primary-dark": "var(--primary-dark)",
        "primary-light": "var(--primary-light)",
        "secondary-light": "var(--secondary-light)",
      }
    },
  },
  plugins: [],
}

/*
npx tailwindcss -i ./public/stylesheets/style.css -o ./public/stylesheets/output.css --watch
*/