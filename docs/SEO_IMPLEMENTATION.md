# SEO Implementation for Hotel Swiss

This document outlines the SEO implementation for the Hotel Swiss website.

## Core Components

### 1. `CommonHead.vue` Component

The main component for handling SEO meta tags on each page. It provides:

- Title and meta description
- Open Graph tags for social sharing
- Twitter Card support
- Canonical URL
- Structured data (JSON-LD) for rich results
- Language meta tags
- Keywords support
- Robots control

Usage example:

```vue
<CommonHead
  title="Page Title - Hotel Swiss"
  description="Detailed page description for SEO"
  url="/page-path"
  keywords="relevant, comma, separated, keywords"
  :structuredDataType="'website'" // Options: 'website', 'hotel', 'organization'
  :structuredDataProps="{/* custom properties */}"
/>
```

### 2. Global SEO Settings

Global SEO settings are configured in `nuxt.config.ts` including:

- Default meta tags
- Favicon
- Theme color
- Font preloading

### 3. robots.txt

Located at `public/robots.txt`, this file controls crawler access and points to the sitemap.

## SEO for Different Page Types

### Static Pages

All static pages include appropriate meta tags with:

- Descriptive titles with brand name
- Unique meta descriptions
- Relevant keywords

### Dynamic Pages

#### Hotel Detail Pages

- Structured data with hotel schema
- Rich property information (star rating, price range)
- Dynamic meta information based on hotel data

#### Category/Canton Pages

- Location-specific meta information
- List-based structured data

## Best Practices Implemented

1. **Unique titles and descriptions** for all pages
2. **Canonical URLs** to prevent duplicate content
3. **Structured data** for rich search results
4. **Language support** for international users
5. **Social sharing optimization** with Open Graph and Twitter Cards
6. **Mobile-friendly** responsive design
7. **Fast loading** with asset optimization and font preloading

## Maintaining SEO

When creating new pages:

1. Always include the `CommonHead` component
2. Provide unique, descriptive titles (50-60 characters)
3. Write compelling meta descriptions (150-160 characters)
4. Add relevant structured data using the `structuredDataType` prop
5. Include a canonical URL
6. Add page to sitemap.xml if it should be indexed

## Future Improvements

Consider implementing:

1. Automated sitemap generation
2. Breadcrumb structured data
3. FAQ schema for FAQ sections
4. AMP versions of content pages
5. Hreflang tags for language variants
