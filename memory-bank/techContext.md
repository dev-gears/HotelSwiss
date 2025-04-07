# Technical Context

## Core Technologies

### Framework & Build

- Nuxt.js (Vue 3)
- TypeScript
- Vite

### UI Framework & Components

- TailwindCSS for styling
  - Custom container configuration
    - No padding on mobile
    - 1rem padding from tablet (md) up
    - Centered by default
- PrimeVue for UI components
  - Aura theme preset
  - Custom dark mode integration
  - Component customization via `pt` prop

### State Management & Data Flow

- Pinia for state management
- Vue composables for shared logic
- API Party for API integration

### Internationalization

- vue-i18n for translations
- Support for en, fr, de, it locales
- Dynamic locale switching

### Maps & Media

- Leaflet for maps integration
- Swiper for image carousels
- Custom gesture handling

## Development Setup

### Environment Variables

```env
BASE_URL=http://localhost:3000
SITE_URL=http://localhost:3000
API_PATH=/api
AUTH_CREDENTIALS=your_credentials
```

### Tailwind Configuration

#### Container Settings

```javascript
container: {
  center: true,
  padding: {
    DEFAULT: '0',
    md: '1rem',
  },
},
```

#### Color Scheme

```javascript
colors: {
  light: {
    DEFAULT: "#ffffff",
    100: "#f2f2f2"
  },
  dark: {
    DEFAULT: "#1a2426",
    100: "#212e30",
    200: "#1a2426",
    300: "#151d1f"
  },
  primary: {
    DEFAULT: "#354f52",
    100: "#26393B",
    200: "#1A2729"
  }
}
```

### Key Dependencies

- @nuxtjs/tailwindcss
- @primevue/nuxt-module
- @nuxtjs/i18n
- @nuxtjs/leaflet
- nuxt-swiper
- @pinia/nuxt

## Component Architecture

### Core Components

- Hotel
  - HotelHero
  - HotelContent
  - HotelAmenities
  - HotelRooms
  - GalleryDrawer
- Search
  - SearchInput
  - SearchFilters
  - FilterDrawer
- Common
  - ThemeToggle
  - LanguageSwitcher
  - ContactForm

### Composables

- useDarkMode
- useHotelApiData
- useFiltersStore

## Build & Deployment

### Build Configuration

```javascript
// nuxt.config.ts
export default defineNuxtConfig({
  ssr: true,
  modules: [...],
  css: ["primeicons/primeicons.css", "assets/css/fonts.css"],
  compatibilityDate: "2024-10-06"
})
```

### Performance Optimizations

- Image optimization via @nuxt/image
- CSS layer ordering for proper cascade
- Component lazy loading
- SEO meta tags
- Sitemap generation

## Security Considerations

- Basic auth for API endpoints
- Environment variable protection
- XSS prevention via Vue's template system
- CORS configuration
- Content Security Policy headers
