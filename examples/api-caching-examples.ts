import { useApiCache } from "~/composables/useApiCache";

export const demonstrateApiCaching = async () => {
  // Example 1: Basic usage with useHotelApiData (built-in caching)
  // ---------------------------------------------------------------------------
  // This uses the built-in caching mechanism from Nuxt API Party
  // The cache persists as long as the page/component exists
  const {
    data: hotels,
    pending,
    refresh,
    error,
  } = await useHotelApiData("hotels/", {
    // Cache is enabled by default for useHotelApiData
    query: { limit: 10 },
  });

  // To force refresh the data, clear the cache and fetch again
  const forceRefresh = async () => {
    // Clear cache and fetch new data
    refresh();
  };

  // Example 2: Direct API call with caching
  // ---------------------------------------------------------------------------
  // For $hotelApi calls, we need to explicitly enable caching
  const fetchHotelsWithCache = async () => {
    const hotels = await $hotelApi("hotels/", {
      query: { limit: 10 },
      // Enable caching for this request
      cache: true,
    });
    return hotels;
  };

  // Example 3: Using our custom cache utility
  // ---------------------------------------------------------------------------
  const { cachedApiCall, useCachedData } = useApiCache();

  // Direct API call with caching
  const fetchWithCustomCache = async () => {
    const hotels = await cachedApiCall("hotels/", {
      query: { limit: 10 },
    });
    return hotels;
  };

  // Reactive data with custom cache key
  const useCachedHotels = () => {
    return useCachedData("hotels/", {
      query: { limit: 10 },
    });
  };

  // Example 4: Generating consistent cache keys for related operations
  // ---------------------------------------------------------------------------
  // This ensures that different parts of your app recognize the same cache entries
  const { createCacheKey } = useApiCache();

  // Generate the same cache key for different components
  const hotelsCacheKey = createCacheKey("hotels/", { limit: 10 });

  // Now you can use this key in different components/pages
  const { data: cachedHotels } = await useHotelApiData("hotels/", {
    query: { limit: 10 },
    key: hotelsCacheKey,
  });
};
