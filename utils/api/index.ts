import { $hotelApi, useHotelApiData } from "#imports";
import type {
  Hotel,
  HotelListWithPagination,
  Category,
  Filters,
  FiltersResponse,
  FirstScreen,
  FirstScreenResponse,
  Canton,
  Amenity,
  Room,
  EmailRequest,
  EmailResponse,
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
  // Custom caching properties for potential future use
  cacheTime?: number; // Time in seconds to cache
  forceRefresh?: boolean; // Force refresh the cache
}

// Extended API data options with caching
export interface CachedApiDataOptions extends ApiDataOptions {
  // Custom caching properties for potential future use
  cacheTime?: number; // Time in seconds to cache
}

/**
 * Type-safe API client functions for direct data fetching
 * These functions use $hotelApi for non-reactive data fetching
 * All endpoints include trailing slash as per OpenAPI spec
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

// Amenity endpoints
export const fetchAmenities = (options?: ApiQueryOptions) =>
  $hotelApi<{ results: Amenity[] }>("amenities/", options);

export const fetchAmenity = (id: number | string, options?: ApiQueryOptions) =>
  $hotelApi<Amenity>(`amenities/${id}/`, options);

// Room endpoints
export const fetchRooms = (options?: ApiQueryOptions) =>
  $hotelApi<{ results: Room[] }>("rooms/", options);

export const fetchRoom = (id: number | string, options?: ApiQueryOptions) =>
  $hotelApi<Room>(`rooms/${id}/`, options);

// Other endpoints
export const fetchFilters = (options?: ApiQueryOptions) =>
  $hotelApi<FiltersResponse>("filters/", options);

export const fetchFirstScreen = (options?: ApiQueryOptions) =>
  $hotelApi<FirstScreenResponse>("first-screen/", options);

// Email endpoint
export const sendEmail = (emailData: EmailRequest, options?: ApiQueryOptions) =>
  $hotelApi<EmailResponse>("send-email/", {
    ...options,
    method: "POST",
    body: emailData,
  });

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

// Amenity composables
export const useAmenitiesData = (options?: ApiDataOptions) =>
  useHotelApiData<{ results: Amenity[] }>("amenities/", options);

export const useAmenityData = (id: number | string, options?: ApiDataOptions) =>
  useHotelApiData<Amenity>(`amenities/${id}/`, options);

// Room composables
export const useRoomsData = (options?: ApiDataOptions) =>
  useHotelApiData<{ results: Room[] }>("rooms/", options);

export const useRoomData = (id: number | string, options?: ApiDataOptions) =>
  useHotelApiData<Room>(`rooms/${id}/`, options);

// Other composables
export const useFiltersData = (options?: ApiDataOptions) =>
  useHotelApiData<FiltersResponse>("filters/", options);

export const useFirstScreenData = (options?: ApiDataOptions) =>
  useHotelApiData<FirstScreenResponse>("first-screen/", options);
