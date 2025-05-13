// tailwind.config.js
const flowbite = require("flowbite/plugin");

module.exports = {
  content: [
    "./resources/**/*.{js,jsx,ts,tsx,vue,blade.php}",
    "./node_modules/flowbite/**/*.js",
    "./node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [flowbite],
};
