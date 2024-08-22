/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./resources/**/*.blade.php", "./resources/**/*.tsx"],
    theme: {
        extend: {
            colors: {
                primary: "#7c3aed",
                "primary-hover": "#6d28d9",
                "primary-dropdown": "#1f2937",
            },
        },
    },
    plugins: [require("daisyui")],
};
