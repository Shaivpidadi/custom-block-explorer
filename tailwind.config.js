/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      black: "#000000",
      white: "#ffffff",
      primary: "#ffffff",
      "gray-050": "#f9f9f9",
      "gray-100": "#ebebeb",
      "gray-200": "#dbdbdb",
      "gray-300": "#bdbdbd",
      "gray-400": "#929292",
      "gray-500": "#6e6e6e",
      "gray-600": "#545454",
      "gray-700": "#3d3d3d",
      "gray-800": "#1a1a1a",
      "gray-900": "#000",
      "blue-050": "#f2f6fc",
      "blue-100": "#e0eeff",
      "blue-200": "#d1e5ff",
      "blue-300": "#b8d3ff",
      "blue-400": "#79a4ff",
      "blue-500": "#4d7cff",
      "blue-600": "#2660ff",
      "blue-700": "#004cff",
      "blue-800": "#003fd3",
      "blue-900": "#0038ba",
      "badge-success": "#a7f3d033",
      "badge-failed": "#FEE2E2",
    },
    extend: {
      colorPrimary: "#000000",
      colorInfo: "#000000",
      colorSuccess: "#caffaf",
      colorWarning: "#fce2ae",
      colorError: "#ffa0a2",
      borderRadius: 2,
      wireframe: true,
      fontFamily: "Varela",
      fontFamily: {
        varela: ['"Varela"', "sans-serif"],
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
