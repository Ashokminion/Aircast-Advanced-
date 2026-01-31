/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: '#050505',
                foreground: '#ffffff',
                card: 'rgba(255, 255, 255, 0.03)',
                'card-foreground': '#ffffff',
                primary: {
                    DEFAULT: '#7c3aed', // Violet
                    foreground: '#ffffff',
                },
                accent: {
                    DEFAULT: '#d946ef', // Fuchsia
                    foreground: '#ffffff',
                },
                secondary: {
                    DEFAULT: '#1e1b4b', // Deep Indigo
                    foreground: '#e0e7ff',
                },
                muted: 'rgba(255, 255, 255, 0.1)',
                'muted-foreground': 'rgba(255, 255, 255, 0.4)',
                border: 'rgba(255, 255, 255, 0.05)',
                ring: '#7c3aed',
                'aqi-good': '#10b981',
                'aqi-moderate': '#f59e0b',
                'aqi-unhealthy-sensitive': '#f97316',
                'aqi-unhealthy': '#ef4444',
                'aqi-very-unhealthy': '#8b5cf6',
                'aqi-hazardous': '#4c1d95',
            },
            fontFamily: {
                serif: ['Georgia', 'Times New Roman', 'serif'],
            },
            boxShadow: {
                soft: '0 2px 15px -3px rgba(124, 58, 237, 0.08)',
                card: '0 4px 25px -5px rgba(124, 58, 237, 0.1)',
                elevated: '0 20px 40px -10px rgba(124, 58, 237, 0.15)',
                frost: '0 0 40px -5px rgba(217, 70, 239, 0.3)',
            },
            animation: {
                shimmer: 'shimmer 3s infinite',
                float: 'float 6s ease-in-out infinite',
                'pulse-slow': 'pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'slide-in-up': 'slideInUp 0.8s ease-out forwards',
            },
            keyframes: {
                shimmer: {
                    '0%': { left: '-100%' },
                    '100%': { left: '100%' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                slideInUp: {
                    from: { opacity: '0', transform: 'translateY(40px)' },
                    to: { opacity: '1', transform: 'translateY(0)' },
                },
            },
        },
    },
    plugins: [require('tailwindcss-animate')],
}
