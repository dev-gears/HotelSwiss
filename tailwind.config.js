// DEFAULT THEME: https://github.com/tailwindlabs/tailwindcss/blob/master/stubs/config.full.js

export default {
    theme: {
        container: {
            center: true,
        },
        colors: {
            light: {
                DEFAULT: "#ffffff", // svetliji-text
                100: "#f2f2f2",
            },
            dark: {
                DEFAULT: "#1f1f1f", // tamniji-text
                100: "#2a2a2a",
                200: "#1a1a1a",
                300: "#0a0a0a",
            },
            primary: {
                DEFAULT: "#354f52",
                100: "#26393B",
                200: "#1A2729", // tamniji-text
            },
            danger: {
                DEFAULT: "#970000",
            },
        },

        fontFamily: {
            patuaOne: "Patua One",
            robotoRegular: "Roboto Regular",
        },

        extend: {
            keyframes: {
                shimmer: {
                    "0%": { "background-position": "-200% 0" },
                    "100%": { "background-position": "200% 0" },
                },
            },
            animation: {
                shimmer: "shimmer 1.5s infinite",
            },
            backgroundImage: {
                "shimmer-gradient": "linear-gradient(90deg, #f0f0f0, #e0e0e0, #f0f0f0)",
                "previous-gradient": "linear-gradient(90deg, #f2f2f2 0%, #f2f2f2 70%, transparent 100%)",
                "next-gradient": "linear-gradient(90deg, transparent 0%, #f2f2f2 30%, #f2f2f2 100%)",
            },
            backgroundSize: {
                "200%": "200% 100%",
                50: "50px",
            },
            boxShadow: {
                cardImage: "2px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                card: "1px 2px 4px 0 rgba(0, 0, 0, 0.4)",
                filters: "1px 2px 4px 0px #00000033",
            },

            aspectRatio: {
                default: "330 / 228",
                square: "1 / 1",
            },
        },
    },
};
