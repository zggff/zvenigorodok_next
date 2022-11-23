/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            height: {
                160: "40rem",
                120: "30rem",
                100: "25rem",
            },
        },
    },
    plugins: [
        plugin(function({ addBase }) {
            addBase({
                html: { fontSize: "20px" },
            });
        }),
    ],
};
