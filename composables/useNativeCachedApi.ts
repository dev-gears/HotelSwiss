/**
 * Native Nuxt 3 cached API composable using built-in features
 * This replaces the complex custom caching implementation
 */

interface CacheOptions {
  ttl?: number;
  key?: string;
  transform?: (data: any) => any;
  params?: Record<string, any>;
}

export const useNativeCachedApi = <T>(
  url: string,
  options: CacheOptions = {},
) => {
  const { ttl = 900, key, transform, params } = options;

  // Generate cache key
  const cacheKey = key || `api:${url}:${JSON.stringify(params || {})}`;

  return useFetch<T>(url, {
    key: cacheKey,
    params,
    transform,

    // Use Nuxt's built-in caching
    getCachedData(key) {
      const nuxtApp = useNuxtApp();
      const data = nuxtApp.payload.data[key] || nuxtApp.static.data[key];

      if (!data) return null;

      // Check if data is stale (only on client)
      if (process.client && data._timestamp) {
        const age = Date.now() - data._timestamp;
        if (age > ttl * 1000) {
          // Data is stale, refresh in background
          return data;
        }
      }

      return data;
    },

    // Prevent duplicate requests
    dedupe: "defer",

    // Transform response
    onResponse(ctx) {
      if (ctx.response._data) {
        ctx.response._data._timestamp = Date.now();
      }
    },
  });
};

// Pre-configured composables for common endpoints
export const useHotelsApi = (params?: any) => {
  return useNativeCachedApi("/api/hotels", {
    ttl: 900, // 15 minutes
    key: `hotels-${JSON.stringify(params || {})}`,
    params,
    transform: (data: any) => data.results || data,
  });
};

export const useHotelApi = (id: string | number) => {
  return useNativeCachedApi(`/api/hotels/${id}`, {
    ttl: 1800, // 30 minutes
    key: `hotel-${id}`,
    transform: (data: any) => data,
  });
};

export const useCategoriesApi = () => {
  return useNativeCachedApi("/api/categories", {
    ttl: 3600, // 1 hour
    key: "categories",
    transform: (data: any) => data.results || data,
  });
};

export const useFirstScreenApi = () => {
  return useNativeCachedApi("/api/first-screen", {
    ttl: 900, // 15 minutes
    key: "first-screen",
    transform: (data: any) => data,
  });
};

export const useHotelsByCategoryApi = (
  categoryId: string | number,
  params?: any,
) => {
  return useNativeCachedApi(`/api/categories/${categoryId}/hotels`, {
    ttl: 3600, // 1 hour
    key: `category-${categoryId}-hotels-${JSON.stringify(params || {})}`,
    params,
    transform: (data: any) => data.results || data,
  });
};

export const useHotelsByCantonApi = (
  cantonId: string | number,
  params?: any,
) => {
  return useNativeCachedApi(`/api/cantons/${cantonId}/hotels`, {
    ttl: 3600, // 1 hour
    key: `canton-${cantonId}-hotels-${JSON.stringify(params || {})}`,
    params,
    transform: (data: any) => data.results || data,
  });
};
