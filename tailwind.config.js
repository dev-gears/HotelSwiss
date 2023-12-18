// DEFAULT THEME: https://github.com/tailwindlabs/tailwindcss/blob/master/stubs/config.full.js

export default {
  theme: {
    colors: {
      light: {
        DEFAULT: "#f8f8f8", // svetliji-text
        100: "#f2f2f2",
      },
      primary: {
        DEFAULT: "#354f52",
        100: "#26393B",
        200: "#1A2729", // tamniji-text
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
      },
      backgroundSize: {
        "200%": "200% 100%",
        50: "50px",
      },
      boxShadow: {
        cardImage: "2px 4px 4px 0px rgba(0, 0, 0, 0.25)",
        card: "1px 2px 4px 0 rgba(0, 0, 0, 0.4)",
      },

      aspectRatio: {
        default: "330 / 228",
        square: "1 / 1",
      },
    },
  },
};
