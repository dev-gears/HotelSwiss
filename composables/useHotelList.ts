import { ref, computed } from "vue";
import type { Ref } from "vue";
import type { Hotel, HotelListWithPagination } from "@/types/hotel";
import { fetchHotels } from "~/utils/api";
import { $hotelApi } from "#imports";
import { useErrorHandler } from "./useErrorHandler";
import { useLoadingState } from "./useLoadingState";
import {
  useHotelQueryBuilder,
  type HotelQueryParams,
} from "./useHotelQueryBuilder";

export interface HotelListFilters extends HotelQueryParams {
  // Additional filters that extend the base query params
  [key: string]: string | number | number[] | undefined;
}

export interface UseHotelListOptions {
  initialFilters?: HotelListFilters;
  autoFetch?: boolean;
}

/**
 * Composable for managing hotel lists with pagination, sorting, and filtering
 * Abstracts common hotel listing logic used across canton, category, and search pages
 * Now includes enhanced error handling and loading states
 * Supports initial filters and automatic fetching
 * Provides methods for sorting, filtering, and pagination
 * Includes loading state management for better UX
 * @returns {Object} - Reactive hotel list data and methods
 * @throws {Error} If the query parameters are invalid
 */
export const useHotelList = (options: UseHotelListOptions = {}) => {
  const { initialFilters = {}, autoFetch = true } = options;

  const hotels = ref<Hotel[]>([]);
  const nextUrl = ref<string | null>(null);
  const totalCount = ref(0);
  const currentFilters = ref<HotelListFilters>({ ...initialFilters });
  const isInitialized = ref(false);

  const { error, isError, handleError, clearError } = useErrorHandler();
  const {
    isLoading,
    isLoadingMore,
    withLoading,
    setState: setLoadingState,
  } = useLoadingState();
  const { validateHotelQuery } = useHotelQueryBuilder();

  const hasMore = computed(() => !!nextUrl.value);
  const isEmpty = computed(
    () => hotels.value.length === 0 && isInitialized.value && !isLoading.value,
  );
  const isInitialLoading = computed(
    () => isLoading.value && !isInitialized.value,
  );

  /**
   * Fetch hotel list with optional filters
   * This function retrieves hotels based on the provided filters
   * It validates the filters against the OpenAPI spec
   * and handles errors gracefully
   * @param additionalFilters - Additional filters to apply on top of current filters
   * @return {Promise<HotelListWithPagination | void>} - Returns hotel list with pagination or void on error
   * @throws {Error} If the query parameters are invalid
   */
  const fetchHotelList = async (additionalFilters: HotelListFilters = {}) => {
    const allFilters = { ...currentFilters.value, ...additionalFilters };

    const validationErrors = validateHotelQuery(allFilters);
    if (validationErrors.length > 0) {
      handleError(
        new Error(`Invalid query parameters: ${validationErrors.join(", ")}`),
      );
      return;
    }

    return withLoading(async () => {
      clearError();

      const filters: Record<string, string | number | number[]> = {};
      Object.entries(allFilters).forEach(([key, value]) => {
        if (value !== undefined) {
          filters[key] = value;
        }
      });
      const data = await fetchHotels(filters);
      hotels.value = data.results;
      nextUrl.value = data.next ?? null;
      totalCount.value = data.count || data.results.length;
      currentFilters.value = allFilters;
      isInitialized.value = true;

      return data;
    });
  };
  /**
   * Load more hotels (pagination)
   * Automatically handles v1/ prefix removal for API calls
   * This function is used to fetch the next page of hotels
   * when the user scrolls down or clicks "Load More"
   */
  const loadMore = async (): Promise<void> => {
    if (!nextUrl.value || isLoadingMore.value) return;

    await withLoading(async () => {
      clearError();

      let apiPath = nextUrl.value as string;
      if (apiPath.startsWith("v1/")) {
        apiPath = apiPath.substring(3);
      }
      const data = (await $hotelApi(apiPath)) as HotelListWithPagination;
      hotels.value = [...hotels.value, ...data.results];
      nextUrl.value = data.next ?? null;
      return data;
    }, "loadingMore");
  };

  /**
   * Handle sorting
   * This function is used to sort the hotel list based on a specific key and value
   * It updates the hotel list by fetching hotels with the new sorting criteria
   * @param key - The sorting key (e.g., "stars", "price")
   * @param value - The sorting value (e.g., "asc", "desc")
   * @returns {Promise<void>}
   * @throws {Error} If the sorting parameters are invalid
   */
  const handleSort = async ({ key, value }: { key: string; value: string }) => {
    await fetchHotelList({ [key]: value });
  };

  /**
   * Update filters and refetch hotel list
   * This function is used to update the current filters and refetch the hotel list
   * @param newFilters - The new filters to apply
   * @returns {Promise<void>}
   * @throws {Error} If the new filters are invalid
   */
  const updateFilters = async (newFilters: HotelListFilters) => {
    await fetchHotelList(newFilters);
  };

  /**
   * Reset to initial state
   * This function resets the hotel list, filters, and loading states
   * It clears any existing errors and sets the loading state to idle
   * @return {void}
   * @throws {Error} If there are any issues during the reset process
   */
  const reset = () => {
    hotels.value = [];
    nextUrl.value = null;
    totalCount.value = 0;
    currentFilters.value = { ...initialFilters };
    clearError();
    setLoadingState("idle");
  };

  if (autoFetch && process.client) {
    fetchHotelList();
  }
  return {
    hotels,
    isLoading,
    loadingMore: isLoadingMore,
    totalCount,
    currentFilters,
    error,
    isError,

    hasMore,
    isEmpty,
    isInitialLoading,

    fetchHotelList,
    loadMore,
    handleSort,
    updateFilters,
    reset,
    clearError,
  };
};
