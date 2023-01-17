/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js, ts, jsx, tsx}", "./components/**/*.{js, ts, jsx, tsx}"],
  theme: {
    extend: {
      colors: {
        menuitem: "#23E0E2",
        button: "#01919e",
        hover: "#8EC1C6",
        op: "rgba(0, 0, 0, 0.5)"
      },
      backgroundImage: {
        banner: "url(../public/banner.png)",
        icon: "url(../public/title.png)",
        login: "url(../public/login.png)",
        info: "url(../public/info.png)",
      },
      boxShadow: {
        shadow: "0px 0px 12px -2px rgba(0, 0, 0, 0.5)",
      },
    },
  },
  plugins: [],
};
