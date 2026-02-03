/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                'garamond': ['"EB Garamond"', 'serif'],
                'redhat': ['"Red Hat Display"', 'sans-serif'],
                'source': ['"Source Sans 3"', 'sans-serif'],
            },
            colors: {
                'arvind-base': '#9f1b3c',
                'arvind-red': '#da1f26',
                'prussian-blue': '#064770',
                'dark-river': '#2c2c2c',
            }
        },
    },
    plugins: [],
}
