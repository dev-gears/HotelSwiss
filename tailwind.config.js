// DEFAULT THEME: https://github.com/tailwindlabs/tailwindcss/blob/master/stubs/config.full.js

export default {
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '0',
        md: '1rem',
      },
    },

    fontFamily: {
      patuaOne: "Patua One",
      robotoRegular: "Roboto Regular",
    },

    extend: {
      colors: {
        light: {
          DEFAULT: "#ffffff", // svetliji-text
          100: "#f2f2f2",
          200: "#e5e5e5", // New light variant for borders and hover states
        },
        dark: {
          DEFAULT: "#1a2426", // Darker variant of your primary color
          50: "#f2f2f2", // Lightest variant for backgrounds
          100: "#212e30", // Slightly lighter
          200: "#1a2426", // Base dark
          300: "#151d1f", // Deeper dark
          400: "#10181a", // Even deeper dark
          500: "#0b1214", // Deepest dark
          600: "#060c0e", // Almost black
          700: "#030606", // Near black
        },
        primary: {
          DEFAULT: "#354f52",
          100: "#26393B",
          200: "#2C4144", // Updated to be a proper mid-tone between DEFAULT and 100
        },
        danger: {
          DEFAULT: "#970000",
        },
      },
      backgroundImage: {
        "previous-gradient": "linear-gradient(90deg, #f2f2f2 0%, #f2f2f2 70%, transparent 100%)",
        "next-gradient": "linear-gradient(90deg, transparent 0%, #f2f2f2 30%, #f2f2f2 100%)",
        "dark-previous-gradient": "linear-gradient(90deg, #212e30 0%, #212e30 70%, transparent 100%)",
        "dark-next-gradient": "linear-gradient(90deg, transparent 0%, #212e30 30%, #212e30 100%)",
      },
      backgroundSize: {
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
