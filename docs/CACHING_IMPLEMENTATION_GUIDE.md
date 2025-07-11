# HotelSwiss Optimal Caching Implementation Guide

## Overview

This document outlines the **native Nuxt 3 caching strategy** implemented for the HotelSwiss application to address slow API response times and improve overall performance. The implementation leverages Nuxt's built-in caching features for optimal performance with minimal custom code.

## Architecture Overview

The caching strategy uses **Nuxt 3's native features**:

1. **Native ISR (Incremental Static Regeneration)** - Built-in page-level caching
2. **Nitro Storage** - Native storage abstraction with automatic driver selection
3. **Cached Event Handlers** - Built-in API response caching with SWR
4. **Smart Data Fetching** - Native composables with automatic deduplication
5. **Route Rules** - Declarative caching configuration

## Implementation Components

### 1. Native Nuxt Configuration

**File**: `nuxt.config.ts`

Uses Nuxt's built-in caching with minimal configuration:

```typescript
export default defineNuxtConfig({
  nitro: {
    // Native storage configuration
    storage: {
      cache: {
        driver: process.env.REDIS_URL ? "redis" : "fs",
        ...(process.env.REDIS_URL && {
          connectionString: process.env.REDIS_URL,
          ttl: 900,
        }),
        ...(!process.env.REDIS_URL && {
          base: "./.nuxt/cache",
        }),
      },
    },

    // Built-in route rules for caching
    routeRules: {
      // API routes with automatic caching
      "/api/**": {
        headers: {
          "cache-control": "public, s-maxage=900, stale-while-revalidate=3600",
          "cdn-cache-control":
            "public, s-maxage=900, stale-while-revalidate=3600",
          vary: "Accept-Encoding, Accept-Language",
        },
      },
      // Static assets with long-term caching
      "/assets/**": {
        headers: { "cache-control": "public, max-age=31536000, immutable" },
      },
      "/images/**": {
        headers: { "cache-control": "public, max-age=31536000, immutable" },
      },
      "/fonts/**": {
        headers: { "cache-control": "public, max-age=31536000, immutable" },
      },
    },

    // Enable built-in timing headers
    timing: true,
  },

  // Native ISR configuration
  routeRules: {
    "/": { isr: 900 }, // Home page - 15 min
    "/hotel/**": { isr: 3600 }, // Hotel pages - 1 hour
    "/category/**": { isr: 7200 }, // Category pages - 2 hours
    "/search": { ssr: false }, // Client-side rendered for dynamic search
  },
});
```

### 2. Native Cached API Handlers

**File**: `server/api/hotels.get.ts`

Uses Nuxt's built-in `cachedEventHandler`:

```typescript
export default cachedEventHandler(
  async (event) => {
    const query = getQuery(event);
    const response = await $fetch(`${process.env.API_BASE_URL}/hotels`, {
      query,
      headers: {
        Authorization: `Basic ${btoa(process.env.AUTH_CREDENTIALS || "")}`,
      },
    });
    return response;
  },
  {
    maxAge: 60 * 15, // 15 minutes
    name: "hotels-list",
    swr: true, // Enable stale-while-revalidate
    varies: ["Authorization", "Accept-Language"],
  },
);
```

### 3. Smart Data Fetching Composables

**File**: `composables/useHotels.ts`

Uses native composables with automatic caching:

```typescript
export const useHotels = (params?: any) => {
  const key = `hotels-${JSON.stringify(params || {})}`;

  return useFetch("/api/hotels", {
    key,
    params,
    // Nuxt handles caching automatically
    getCachedData(key) {
      const nuxtApp = useNuxtApp();
      return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
    },
    dedupe: "defer", // Prevent duplicate requests
    transform: (data: any) => data.results || data,
  });
};

export const useHotelsByCategory = (categoryId: string | number) => {
  return useFetch(`/api/categories/${categoryId}/hotels`, {
    key: `category-${categoryId}-hotels`,
    getCachedData(key) {
      const nuxtApp = useNuxtApp();
      return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
    },
  });
};
```

#### Cache Configuration by Endpoint:

| Endpoint Type  | TTL     | SWR     | Use Case                 |
| -------------- | ------- | ------- | ------------------------ |
| First Screen   | 15 min  | 30 min  | Landing page data        |
| Hotel Details  | 30 min  | 1 hour  | Individual hotel info    |
| Hotel Lists    | 1 hour  | 2 hours | Category/canton listings |
| Categories     | 2 hours | 4 hours | Static category data     |
| Search Results | 10 min  | 20 min  | Dynamic search data      |

### 4. Cache Warming System

**File**: `server/plugins/cache-warmer.ts`

Proactively populates cache with critical data:

#### Features:

- **Startup warming**: Populates cache when server starts
- **Scheduled warming**: Refreshes cache every hour
- **Error handling**: Graceful fallback on failures
- **Monitoring**: Logs warming success/failure rates

#### Warmed Endpoints:

- `/first-screen/` - Landing page data
- `/categories/` - Hotel categories
- `/cantons/` - Swiss cantons
- `/amenities/` - Hotel amenities
- `/rooms/` - Room types
- `/filters/` - Filter options

### 5. Service Worker (Client-Side Caching)

**File**: `public/sw.js`

Provides offline-first caching with strategies:

#### Cache Strategies:

- **Network First**: API calls with cache fallback
- **Cache First**: Images and static assets
- **Stale While Revalidate**: Pages and dynamic content

#### Cache Types:

- **API Cache**: API responses with 15-minute TTL
- **Image Cache**: Images with long-term caching
- **Page Cache**: HTML pages with background refresh

### 6. Server-Side Cache Plugin

**File**: `server/plugins/cache.ts`

Manages server-side caching with:

- Redis support for production
- Memory fallback for development
- Automatic cache header injection
- Storage abstraction layer

## Usage Guide

### Setting Up the Environment

1. **Install Dependencies**:

```bash
npm install unstorage @nuxt/image
```

2. **Environment Variables**:

```env
# Production Redis (optional)
REDIS_URL=redis://localhost:6379

# API Configuration
BASE_URL=https://api.hotelswiss.com
API_PATH=/api/v1
AUTH_CREDENTIALS=username:password

# Cache Settings
CACHE_TTL_DEFAULT=900
CACHE_TTL_HOTELS=3600
CACHE_TTL_STATIC=7200
```

### Using Cached APIs in Components

#### Basic Component Usage:

```vue
<template>
  <div>
    <div v-if="pending">Loading...</div>
    <div v-else-if="error">Error: {{ error }}</div>
    <div v-else>
      <HotelCard v-for="hotel in data.results" :key="hotel.id" :hotel="hotel" />
    </div>
  </div>
</template>

<script setup>
// Automatically cached with optimal settings
const { data, pending, error } = await useHotelsByCategoryCached(categoryId);
</script>
```

#### Advanced Usage with Manual Cache Control:

```vue
<script setup>
const { data, pending, error, refresh } = await useCachedApi("/api/search", {
  ttl: 600, // 10 minutes
  swr: 1200, // 20 minutes
  key: computed(() => `search-${searchQuery.value}`),
});

// Manual refresh
const handleRefresh = async () => {
  await refresh();
};

// Cache key updates automatically when searchQuery changes
watch(searchQuery, () => {
  refresh();
});
</script>
```

### Cache Management APIs

#### Manual Cache Warming:

```bash
# Warm specific endpoints
POST /api/cache/warm
{
  "endpoints": ["/first-screen/", "/categories/"]
}

# Warm all critical endpoints
POST /api/cache/warm-all
```

#### Cache Statistics:

```bash
# Get cache statistics
GET /api/cache/stats
```

Response:

```json
{
  "hitRate": 85.6,
  "totalRequests": 1247,
  "cacheHits": 1067,
  "cacheMisses": 180,
  "cacheSize": "24.3 MB",
  "keys": 156
}
```

## Performance Benefits

### Expected Improvements:

1. **API Response Time**:

   - First request: ~2-3 seconds (original)
   - Cached requests: ~50-100ms
   - Stale requests: ~100-200ms (while refreshing)

2. **Page Load Time**:

   - ISR pages: ~200-400ms
   - Cached pages: ~100-200ms
   - Offline pages: ~50-100ms

3. **Server Load Reduction**:
   - ~60-80% reduction in API calls
   - ~40-60% reduction in server CPU usage
   - ~50-70% reduction in bandwidth usage

### Cache Hit Rates (Target):

- **First Screen Data**: ~90%
- **Hotel Details**: ~80%
- **Search Results**: ~60%
- **Category Pages**: ~95%

## Monitoring and Debugging

### Cache Status Indicators:

```typescript
// Check cache status in components
const cacheStatus = useCacheStatus();

// Available properties:
// cacheStatus.enabled - Is caching enabled?
// cacheStatus.hitRate - Current hit rate
// cacheStatus.lastWarmed - Last cache warming time
```

### Debug Mode:

```typescript
// Enable cache debugging
const { data } = await useCachedApi("/api/hotels", {
  debug: true, // Logs cache hits/misses
});
```

### Cache Invalidation:

```typescript
// Clear specific cache
await clearCache("hotels-list");

// Clear all cache
await clearAllCache();

// Clear expired cache
await clearExpiredCache();
```

## Best Practices

### 1. Cache Key Strategy:

- Use descriptive, unique cache keys
- Include relevant parameters in keys
- Avoid special characters in keys

### 2. TTL Configuration:

- **Static data**: 2-4 hours
- **Semi-static data**: 30-60 minutes
- **Dynamic data**: 5-15 minutes
- **Real-time data**: 1-5 minutes

### 3. Error Handling:

- Always provide fallback for cache failures
- Log cache errors for monitoring
- Gracefully degrade when cache is unavailable

### 4. Cache Warming:

- Warm critical paths on startup
- Schedule regular warming for popular data
- Monitor warming success rates

### 5. Storage Management:

- Monitor cache size and memory usage
- Implement cache eviction policies
- Use appropriate storage drivers for environment

## Troubleshooting

### Common Issues:

1. **Cache Not Working**:

   - Check storage configuration
   - Verify environment variables
   - Check network connectivity for Redis

2. **High Memory Usage**:

   - Reduce cache TTL values
   - Implement cache size limits
   - Clear expired cache regularly

3. **Stale Data Issues**:

   - Verify SWR settings
   - Check cache invalidation logic
   - Monitor cache warming frequency

4. **Performance Issues**:
   - Check cache hit rates
   - Verify cache key uniqueness
   - Monitor storage performance

### Debug Commands:

```bash
# Check cache status
npm run cache:status

# Warm cache manually
npm run cache:warm

# Clear all cache
npm run cache:clear

# View cache statistics
npm run cache:stats
```

## Future Enhancements

1. **Advanced Cache Strategies**:

   - LRU (Least Recently Used) eviction
   - Cache tagging for granular invalidation
   - Distributed cache synchronization

2. **Performance Monitoring**:

   - Cache performance metrics
   - Real-time cache hit rate monitoring
   - Cache size and memory usage alerts

3. **Intelligent Caching**:

   - Machine learning-based cache warming
   - Dynamic TTL based on usage patterns
   - Predictive cache preloading

4. **Edge Caching**:
   - CDN integration
   - Edge function caching
   - Geographic cache distribution

## Conclusion

This caching implementation provides a robust, scalable solution for addressing slow API responses in the HotelSwiss application. The multi-layered approach ensures optimal performance while maintaining data freshness and providing graceful fallbacks.

The system is designed to be:

- **Performance-first**: Optimized for speed and efficiency
- **Resilient**: Graceful degradation on failures
- **Scalable**: Supports growing traffic and data
- **Maintainable**: Clear APIs and monitoring tools
- **Flexible**: Configurable for different use cases

Regular monitoring and optimization based on usage patterns will ensure continued performance benefits as the application grows.
