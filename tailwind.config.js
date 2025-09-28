module.exports = {
    content: [
        './src/**/*.{js,jsx,ts,tsx}', // Adjust the paths based on your project structure
        './public/index.html',
    ],
    theme: {
        extend: {
            colors: {
                pastelpink: "var(--pastel-pink)",
                lavender: "var(--lavender)"
            },
        },
    },
    plugins: [require('tailwindcss-animate')],
};