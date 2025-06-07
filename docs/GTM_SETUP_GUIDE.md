# Google Tag Manager Setup Guide for Hotel Swiss

## Prerequisites

- Gmail business account created
- Access to Google Tag Manager (tagmanager.google.com)
- Admin access to the Hotel Swiss website

## Step 1: Create GTM Container

1. **Go to Google Tag Manager**

   - Visit: https://tagmanager.google.com
   - Sign in with your new Gmail business account

2. **Create Account & Container**

   ```
   Account Name: Hotel Swiss
   Country: Switzerland
   Container Name: hotelswiss.stefanivic.com
   Target Platform: Web
   ```

3. **Get GTM Container ID**
   - After creation, you'll get a Container ID (format: GTM-XXXXXXX)
   - Save this ID - you'll need it for implementation

## Step 2: Install GTM on Website

### Manual Implementation (Recommended for Nuxt 3)

Since the official `@nuxtjs/gtm` module is designed for Nuxt 2, we'll implement GTM manually using Nuxt 3's head configuration.

1. **Add to your `.env` file:**

```bash
NUXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

2. **GTM is already configured in nuxt.config.ts:**

```typescript
export default defineNuxtConfig({
  app: {
    head: {
      // ...existing head config...
      script: process.env.NUXT_PUBLIC_GTM_ID
        ? [
            {
              innerHTML: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${process.env.NUXT_PUBLIC_GTM_ID}');`,
              type: "text/javascript",
            },
          ]
        : [],
    },
  },
  runtimeConfig: {
    public: {
      gtmId: process.env.NUXT_PUBLIC_GTM_ID || "",
    },
  },
});
```

3. **GTM Plugin is created at `plugins/gtm.client.ts`**

   - Provides global GTM functions
   - Automatically tracks page views on route changes
   - Includes helper functions for event tracking

4. **GTM Composable is available at `composables/useGTM.ts`**
   - Hotel-specific tracking functions
   - Easy-to-use wrapper for common events

### Usage Examples

```vue
<script setup>
const { trackHotelView, trackHotelSearch, trackContactFormSubmission } =
  useGTM();

// Track hotel view
const hotel = { id: "123", name: "Hotel Example", location: "Zurich" };
trackHotelView(hotel);

// Track search
trackHotelSearch({
  search_term: "luxury hotels",
  location: "Geneva",
  category: "luxury",
});

// Track contact form
trackContactFormSubmission({
  form_type: "hotel_contact",
  hotel_id: "123",
  hotel_name: "Hotel Example",
});
</script>
```

## Step 3: Configure GTM Tags

### Essential Tags to Set Up:

1. **Google Analytics 4 (GA4)**

   - Tag Type: Google Analytics: GA4 Configuration
   - Measurement ID: Your GA4 property ID
   - Trigger: All Pages

2. **Enhanced Ecommerce (for hotel bookings)**

   - Track: contact_hotel, view_hotel, search_hotels events

3. **Contact Form Tracking**

   - Track form submissions from contact forms
   - Event: contact_form_submission

4. **Hotel Detail Views**

   - Track when users view hotel details
   - Event: view_hotel

5. **Search Tracking**
   - Track hotel searches
   - Event: search_hotels

## Step 4: Data Layer Implementation

Add data layer events to track user interactions:

```javascript
// Hotel view tracking
dataLayer.push({
  event: "view_hotel",
  hotel_id: "hotel_123",
  hotel_name: "Hotel Example",
  location: "Zurich",
});

// Search tracking
dataLayer.push({
  event: "search_hotels",
  search_term: "luxury hotels",
  location: "Geneva",
  filters: {
    price_range: "200-400",
    stars: "4-5",
  },
});

// Contact form tracking
dataLayer.push({
  event: "contact_form_submission",
  form_type: "hotel_contact",
  hotel_id: "hotel_123",
});
```

## Step 5: Testing & Debugging

1. **GTM Preview Mode**

   - Use GTM's preview mode to test tags
   - Verify events are firing correctly

2. **Google Analytics Real-time**

   - Check GA4 real-time reports
   - Verify data is being received

3. **Browser Developer Tools**
   - Check for GTM container loading
   - Verify dataLayer events

## Step 6: Common GTM Tags for Hotel Websites

### Performance Tracking

- Page Load Times
- Core Web Vitals
- Mobile Performance

### User Behavior

- Scroll Depth
- Click Tracking (CTA buttons)
- File Downloads

### Business Metrics

- Hotel Contact Attempts
- Search Queries
- Filter Usage
- Language Preferences

## Gmail Integration with GTM

### Email Event Tracking

1. **Contact Form to Gmail**

   - Track when contact forms are submitted
   - Measure conversion from form to actual email

2. **Email Campaign Tracking**
   - Use UTM parameters for email campaigns
   - Track email open rates (if using Gmail API)

### Setup Email Notifications

1. **Google Apps Script (for automated emails)**
2. **Gmail API integration**
3. **Contact form submissions tracking**

## Environment-Specific Setup

### Development

```bash
NUXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NUXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### Production

- Same variables in Vercel environment settings
- Enable GTM publishing
- Test all tracking events

## Privacy & GDPR Compliance

Since your website already has cookie consent:

1. **Update Cookie Policy**

   - Include GTM in analytics cookies section
   - Mention Google Analytics data collection

2. **Conditional Loading**

   - Only load GTM after cookie consent
   - Respect user privacy preferences

3. **Data Retention**
   - Configure GA4 data retention settings
   - Set up data deletion requests handling

## Monitoring & Maintenance

1. **Regular Testing**

   - Monthly GTM tag testing
   - Analytics data verification

2. **Performance Monitoring**

   - GTM impact on page speed
   - Tag loading optimization

3. **Data Quality**
   - Regular data accuracy checks
   - Event tracking validation
