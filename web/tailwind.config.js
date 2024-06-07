/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        prompt: ["Prompt", "sans-serif"],
        palanquin: ["Palanquin", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
      colors: {
        primary: "#ECEEFF",
        "ifcg-red-high": "#C73631",
        "ifcg-red-low": "#FACFCE",
        "ifcg-black-high": "#212121",
        "ifcg-black-low": "#A3A3A3",
        "ifcg-gray-high": "#A6A6A6",
        "ifcg-gray-low": "#EAEAEA",
        "ifcg-white": "#F8F8F8",
        "ifcg-green-high": "#31C2C7",
        "ifcg-green-low": "#d6f7f7",
      },
    },
    fontFamily: {
      sans: ["Prompt", "sans-serif"],
    },
  },
  plugins: [],
};
