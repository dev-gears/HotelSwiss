import { $hotelApi, useHotelApiData } from "#imports";

/**
 * Composable for managing API caching in HotelSwiss application
 *
 * This composable provides a wrapper around the built-in Nuxt API Party
 * caching mechanism with additional utilities for cache management
 */
export const useApiCache = () => {
  /**
   * Create a custom cache key for API calls
   * @param path - API endpoint path
   * @param query - Query parameters
   */
  const createCacheKey = (path: string, query?: Record<string, any>) => {
    return `${path}-${JSON.stringify(query || {})}`;
  };

  /**
   * Make a cached API call with custom key
   * @param path - API endpoint path
   * @param options - API options
   */ const cachedApiCall = <T>(path: string, options: any = {}) => {
    const { query, cacheTime, forceRefresh, ...rest } = options;

    // For now, we can only use boolean cache values with nuxt-api-party
    // The cacheTime and forceRefresh are extracted but not directly used yet
    return $hotelApi<T>(path, {
      ...rest,
      query,
      // Enable caching for this request
      cache: forceRefresh ? false : true,
      // Use a custom cache key if needed
      key: createCacheKey(path, query),
    });
  };

  /**
   * Use reactive API data with cache control
   * @param path - API endpoint path
   * @param options - API options
   */ const useCachedData = <T>(path: string, options: any = {}) => {
    const { query, cacheTime, forceRefresh, ...rest } = options;

    return useHotelApiData<T>(path, {
      ...rest,
      query,
      // Cache is enabled by default in useHotelApiData
      // Use a custom cache key if needed
      key: createCacheKey(path, query),
    });
  };

  return {
    cachedApiCall,
    useCachedData,
    createCacheKey,
  };
};
