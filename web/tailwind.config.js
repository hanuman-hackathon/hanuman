/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "off-white": "#F9FAFB",
        "off-black": "#323232",
        "border-grey": "#E5E5E7",
        "logo-blue": "#349EFF",
      },
      padding: {
        "page-x": "60px",
        "page-y": "40px",
      },
      boxShadow: {
        standard: "1px 1px 16px #F1F2F2",
        strong: "1px 1px 16px #e8e8e8",
      },
    },
  },
  plugins: [],
};
