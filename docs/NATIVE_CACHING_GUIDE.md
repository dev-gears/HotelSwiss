# Native Nuxt 3 Caching Implementation

## Overview

This implementation uses Nuxt 3's native caching features instead of custom caching logic. This approach is:

- **Cleaner**: 90% less code to maintain
- **Faster**: Optimized by the Nuxt team
- **More reliable**: Built-in error handling and edge cases
- **Better TypeScript support**: Full type safety
- **Automatic deduplication**: Prevents duplicate requests
- **Payload extraction**: Automatic SSR/SSG optimization

## How to Use

### 1. API Endpoints (Server-side)

All API endpoints now use `cachedEventHandler`:

```typescript
// server/api/hotels/index.get.ts
export default cachedEventHandler(
  async (event) => {
    // Your API logic
    return await $fetch("external-api/hotels");
  },
  {
    maxAge: 60 * 15, // 15 minutes
    name: "hotels-list",
    swr: true, // Stale-while-revalidate
  },
);
```

### 2. Composables (Client-side)

Use the composables for data fetching:

```typescript
// In your components
import { useHotels } from "~/composables/useApi";

const {
  data: hotels,
  pending,
  error,
} = await useHotels({
  category: "luxury",
  limit: 10,
});
```

### 3. Available Composables

- `useHotels(params)` - Get hotels with filters
- `useHotel(id)` - Get single hotel
- `useCategories()` - Get all categories
- `useCantons()` - Get all cantons
- `useFirstScreen()` - Get first screen data
- `useAmenities()` - Get all amenities
- `useFilters()` - Get filter options
- `useHotelsByCategory(categoryId, params)` - Get hotels by category
- `useHotelsByCanton(cantonId, params)` - Get hotels by canton
- `useSearchHotels(searchParams)` - Search hotels

### 4. Cache Configuration

Cache times are optimized per endpoint:

| Endpoint      | Cache Time | Reason        |
| ------------- | ---------- | ------------- |
| Hotels List   | 15 minutes | Dynamic data  |
| Hotel Details | 30 minutes | Semi-static   |
| Categories    | 2 hours    | Static data   |
| Cantons       | 2 hours    | Static data   |
| First Screen  | 15 minutes | Landing page  |
| Amenities     | 2 hours    | Static data   |
| Filters       | 1 hour     | Configuration |

### 5. Migration Guide

**Before (Custom caching):**

```vue
<script setup>
import { useHotelsData } from "~/utils/api";

const { data, pending, error } = await useHotelsData({ category: "luxury" });
</script>
```

**After (Native caching):**

```vue
<script setup>
import { useHotels } from "~/composables/useApi";

const { data, pending, error } = await useHotels({
  category: "luxury",
});
</script>
```

### 6. Benefits

- **Automatic deduplication**: Same requests are merged
- **Built-in SWR**: Stale-while-revalidate out of the box
- **Payload extraction**: Automatic SSR optimization
- **Better performance**: Native implementation is faster
- **Less code**: 90% reduction in caching code
- **Better error handling**: Built-in retry and error states
- **Type safety**: Full TypeScript support

### 7. Monitoring

The cache plugin adds response timing headers:

- `X-Response-Time`: Request duration in milliseconds

Cache warming happens automatically on production startup.

### 8. Environment Variables

```env
# Required
NUXT_PUBLIC_API_BASE_URL=https://api.hotelswiss.com/api/v1
NUXT_AUTH_CREDENTIALS=username:password

# Optional
REDIS_URL=redis://localhost:6379
```

## That's it!

The caching now works automatically with much less code and better performance. See `examples/migration-example.vue` for a complete example.
