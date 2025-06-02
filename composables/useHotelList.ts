import { ref, computed } from "vue";
import type { Ref } from "vue";
import type { Hotel, HotelListWithPagination } from "@/types/hotel";
import { fetchHotels } from "~/utils/api";
import { $hotelApi } from "#imports";

export interface HotelListFilters {
  canton_id?: string | number;
  category_id?: string | number;
  [key: string]: string | number | number[] | undefined;
}

export interface UseHotelListOptions {
  initialFilters?: HotelListFilters;
  autoFetch?: boolean;
}

/**
 * Composable for managing hotel lists with pagination, sorting, and filtering
 * Abstracts common hotel listing logic used across canton, category, and search pages
 */
export const useHotelList = (options: UseHotelListOptions = {}) => {
  const { initialFilters = {}, autoFetch = true } = options;

  const hotels = ref<Hotel[]>([]);
  const nextUrl = ref<string | null>(null);
  const isLoading = ref(false);
  const loadingMore = ref(false);
  const totalCount = ref(0);
  const currentFilters = ref<HotelListFilters>({ ...initialFilters });
  const isInitialized = ref(false);

  const hasMore = computed(() => !!nextUrl.value);
  const isEmpty = computed(
    () => hotels.value.length === 0 && isInitialized.value && !isLoading.value,
  );
  const isInitialLoading = computed(
    () => isLoading.value && !isInitialized.value,
  );
  /**
   * Fetch hotels with current filters
   */
  const fetchHotelList = async (additionalFilters: HotelListFilters = {}) => {
    try {
      isLoading.value = true;
      const allFilters = { ...currentFilters.value, ...additionalFilters };

      const filters: Record<string, string | number | number[]> = {};
      Object.entries(allFilters).forEach(([key, value]) => {
        if (value !== undefined) {
          filters[key] = value;
        }
      });

      const data = await fetchHotels(filters);
      hotels.value = data.results;
      nextUrl.value = data.next;
      totalCount.value = data.count || data.results.length;
      currentFilters.value = allFilters;
      isInitialized.value = true;
    } catch (error) {
      console.warn("Error fetching hotels:", error);
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Load more hotels (pagination)
   */
  const loadMore = async () => {
    if (!nextUrl.value || loadingMore.value) return;

    try {
      loadingMore.value = true;
      const data = (await $hotelApi(nextUrl.value)) as HotelListWithPagination;
      hotels.value = [...hotels.value, ...data.results];
      nextUrl.value = data.next;
    } catch (error) {
      console.warn("Error loading more hotels:", error);
    } finally {
      loadingMore.value = false;
    }
  };
  /**
   * Handle sorting
   */
  const handleSort = async ({ key, value }: { key: string; value: string }) => {
    await fetchHotelList({ [key]: value });
  };

  /**
   * Update filters and refetch
   */
  const updateFilters = async (newFilters: HotelListFilters) => {
    await fetchHotelList(newFilters);
  };

  /**
   * Reset to initial state
   */
  const reset = () => {
    hotels.value = [];
    nextUrl.value = null;
    totalCount.value = 0;
    currentFilters.value = { ...initialFilters };
  };

  if (autoFetch && process.client) {
    fetchHotelList();
  }
  return {
    hotels,
    isLoading,
    loadingMore,
    totalCount,
    currentFilters,

    hasMore,
    isEmpty,
    isInitialLoading,

    fetchHotelList,
    loadMore,
    handleSort,
    updateFilters,
    reset,
  };
};
