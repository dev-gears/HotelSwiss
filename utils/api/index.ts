import { $hotelApi, useHotelApiData } from "#imports";
import type {
  Hotel,
  HotelListWithPagination,
  Category,
  Filters,
  FirstScreen,
  Canton,
} from "~/types/hotel";

// Types for API fetch options
export interface ApiQueryOptions {
  query?: Record<string, string | number | boolean | number[]>;
  headers?: Record<string, string>;
  key?: string;
  client?: boolean;
  cache?: boolean;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: Record<string, any> | FormData;
  onRequest?: (context: any) => Promise<void> | void;
  onResponse?: (context: any) => Promise<void> | void;
  onRequestError?: (context: any) => Promise<void> | void;
  onResponseError?: (context: any) => Promise<void> | void;
}

// Types for useApiData options
export interface ApiDataOptions extends ApiQueryOptions {
  lazy?: boolean;
  default?: () => any;
  transform?: (data: any) => any;
  watch?: any[] | false;
}

// Extended API options with caching
export interface CachedApiOptions extends ApiQueryOptions {
  // We'll use standard cache logic but add these as custom properties
  // that our useApiCache composable can handle
  cacheTime?: number; // Time in seconds to cache
  forceRefresh?: boolean; // Force refresh the cache
}

// Extended API data options with caching
export interface CachedApiDataOptions extends ApiDataOptions {
  // We'll use standard cache logic but add these as custom properties
  // that our useApiCache composable can handle
  cacheTime?: number; // Time in seconds to cache
}

/**
 * Type-safe API client functions for direct data fetching
 * These functions use $hotelApi for non-reactive data fetching
 */

// Hotel endpoints
export const fetchHotel = (id: number | string, options?: ApiQueryOptions) =>
  $hotelApi<Hotel>(`hotels/${id}/`, options);

export const fetchHotels = (
  params?: Record<string, string | number | number[]>,
  options?: ApiQueryOptions,
) =>
  $hotelApi<HotelListWithPagination>("hotels/", {
    ...options,
    query: { ...(params || {}), ...(options?.query || {}) },
  });

// Category endpoints
export const fetchCategories = (options?: ApiQueryOptions) =>
  $hotelApi<{ results: Category[] }>("categories/", options);

export const fetchCategory = (id: number | string, options?: ApiQueryOptions) =>
  $hotelApi<Category>(`categories/${id}/`, options);

// Canton endpoints
export const fetchCantons = (options?: ApiQueryOptions) =>
  $hotelApi<{ results: Canton[] }>("cantons/", options);

export const fetchCanton = (id: number | string, options?: ApiQueryOptions) =>
  $hotelApi<Canton>(`cantons/${id}/`, options);

// Other endpoints
export const fetchFilters = (options?: ApiQueryOptions) =>
  $hotelApi<Filters>("filters/", options);

export const fetchFirstScreen = (options?: ApiQueryOptions) =>
  $hotelApi<FirstScreen>("first-screen/", options);

/**
 * Type-safe composables for reactive data fetching
 * These composables use useHotelApiData for reactive data with auto-refresh,
 * error handling, and loading states
 */

// Hotel composables
export const useHotelData = (id: number | string, options?: ApiDataOptions) =>
  useHotelApiData<Hotel>(`hotels/${id}/`, options);

export const useHotelsData = (
  params?: Record<string, string | number>,
  options?: ApiDataOptions,
) =>
  useHotelApiData<HotelListWithPagination>("hotels/", {
    ...options,
    query: { ...(params || {}), ...(options?.query || {}) },
  });

// Category composables
export const useCategoriesData = (options?: ApiDataOptions) =>
  useHotelApiData<{ results: Category[] }>("categories/", options);

export const useCategoryData = (
  id: number | string,
  options?: ApiDataOptions,
) => useHotelApiData<Category>(`categories/${id}/`, options);

// Canton composables
export const useCantonsData = (options?: ApiDataOptions) =>
  useHotelApiData<{ results: Canton[] }>("cantons/", options);

export const useCantonData = (id: number | string, options?: ApiDataOptions) =>
  useHotelApiData<Canton>(`cantons/${id}/`, options);

export const useFirstScreenData = (options?: ApiDataOptions) =>
  useHotelApiData<FirstScreen>("first-screen/", options);
