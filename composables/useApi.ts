/**
 * Native Nuxt 3 caching composables for HotelSwiss API
 * These use built-in Nuxt features for optimal performance
 */

import type {
  Hotel,
  HotelListWithPagination,
  Category,
  Canton,
  Amenity,
  Room,
  FiltersResponse,
  FirstScreenResponse,
  EmailRequest,
  EmailResponse,
} from "~/types/hotel";

/**
 * Hotels composables with native caching
 */
export const useHotels = (params?: Record<string, any>) => {
  const key = `hotels-${JSON.stringify(params || {})}`;

  return useFetch<HotelListWithPagination>("/api/hotels", {
    key,
    query: params,
    // Native Nuxt caching
    getCachedData(key) {
      const nuxtApp = useNuxtApp();
      return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
    },
    // Enable request deduplication
    dedupe: "defer",
    // Transform response if needed
    transform: (data: any) => data,
    // Lazy loading for better UX
    lazy: true,
  });
};

export const useHotel = (id: string | number) => {
  return useFetch<Hotel>(`/api/hotels/${id}`, {
    key: `hotel-${id}`,
    getCachedData(key) {
      const nuxtApp = useNuxtApp();
      return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
    },
    dedupe: "defer",
    lazy: true,
  });
};

/**
 * Categories composables with native caching
 */
export const useCategories = () => {
  return useFetch<{ results: Category[] }>("/api/categories", {
    key: "categories-list",
    getCachedData(key) {
      const nuxtApp = useNuxtApp();
      return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
    },
    dedupe: "defer",
    lazy: true,
  });
};

/**
 * Cantons composables with native caching
 */
export const useCantons = () => {
  return useFetch<{ results: Canton[] }>("/api/cantons", {
    key: "cantons-list",
    getCachedData(key) {
      const nuxtApp = useNuxtApp();
      return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
    },
    dedupe: "defer",
    lazy: true,
  });
};

/**
 * First screen data with native caching
 */
export const useFirstScreen = () => {
  return useFetch<FirstScreenResponse>("/api/first-screen", {
    key: "first-screen-data",
    getCachedData(key) {
      const nuxtApp = useNuxtApp();
      return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
    },
    dedupe: "defer",
    lazy: true,
  });
};

/**
 * Amenities composables with native caching
 */
export const useAmenities = () => {
  return useFetch<{ results: Amenity[] }>("/api/amenities", {
    key: "amenities-list",
    getCachedData(key) {
      const nuxtApp = useNuxtApp();
      return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
    },
    dedupe: "defer",
    lazy: true,
  });
};

/**
 * Filters composables with native caching
 */
export const useFilters = () => {
  return useFetch<FiltersResponse>("/api/filters", {
    key: "filters-data",
    getCachedData(key) {
      const nuxtApp = useNuxtApp();
      return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
    },
    dedupe: "defer",
    lazy: true,
  });
};

/**
 * Hotels by category with native caching
 */
export const useHotelsByCategory = (
  categoryId: string | number,
  params?: Record<string, any>,
) => {
  const key = `hotels-category-${categoryId}-${JSON.stringify(params || {})}`;

  return useFetch<HotelListWithPagination>("/api/hotels", {
    key,
    query: { category: categoryId, ...params },
    getCachedData(key) {
      const nuxtApp = useNuxtApp();
      return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
    },
    dedupe: "defer",
    lazy: true,
  });
};

/**
 * Hotels by canton with native caching
 */
export const useHotelsByCanton = (
  cantonId: string | number,
  params?: Record<string, any>,
) => {
  const key = `hotels-canton-${cantonId}-${JSON.stringify(params || {})}`;

  return useFetch<HotelListWithPagination>("/api/hotels", {
    key,
    query: { canton: cantonId, ...params },
    getCachedData(key) {
      const nuxtApp = useNuxtApp();
      return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
    },
    dedupe: "defer",
    lazy: true,
  });
};

/**
 * Search hotels with native caching
 */
export const useSearchHotels = (searchParams: Record<string, any>) => {
  const key = `search-hotels-${JSON.stringify(searchParams)}`;

  return useFetch<HotelListWithPagination>("/api/hotels", {
    key,
    query: searchParams,
    getCachedData(key) {
      const nuxtApp = useNuxtApp();
      const data = nuxtApp.payload.data[key] || nuxtApp.static.data[key];

      // Optional: Check if search data is stale (shorter cache for dynamic data)
      if (data && import.meta.client) {
        const age = Date.now() - (data._timestamp || 0);
        if (age > 300000) {
          // 5 minutes for search results
          return null; // Force refresh
        }
      }

      return data;
    },
    dedupe: "defer",
    lazy: true,
  });
};

/**
 * Send email using the send-email API endpoint
 * @param emailData - Email request data
 * @returns Promise with email response
 */
export const useSendEmail = async (
  emailData: EmailRequest,
): Promise<EmailResponse> => {
  const data = await $fetch<EmailResponse>("/api/send-email", {
    method: "POST",
    body: emailData,
  });

  return data;
};
