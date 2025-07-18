import { computed, watch, nextTick } from "vue";
import { useRoute } from "vue-router";
import { useHotelList } from "./useHotelList";
import { buildApiQueryParams } from "~/utils/filter-url-params";

/**
 * Composable for search page data and hotel management
 */
export const useSearchPage = () => {
  const route = useRoute();

  const searchTerm = computed(() => (route.query.q as string) || "");

  const hotelList = useHotelList({
    autoFetch: false,
  });

  /**
   * Fetch hotels based on current URL parameters
   */
  const fetchFilteredHotels = async (
    additionalParams: Record<string, string | number | number[]> = {},
  ) => {
    const params = buildApiQueryParams(route, additionalParams);
    await hotelList.updateFilters(params);
  };
  /**
   * Handle sort with URL parameter integration
   */
  const handleSort = async (params: { key: string; value: string }) => {
    await fetchFilteredHotels({ [params.key]: params.value });
  };

  watch(
    () => route.query,
    (newQuery, oldQuery) => {
      // Only fetch if query actually changed (deep comparison)
      if (JSON.stringify(newQuery) !== JSON.stringify(oldQuery)) {
        // Force reactivity by using nextTick
        nextTick(() => {
          fetchFilteredHotels();
        });
      }
    },
    { immediate: true, deep: true },
  );

  // Additional watch on route.fullPath as backup
  watch(
    () => route.fullPath,
    (newPath, oldPath) => {
      // Silent watch for backup
    },
  );

  return {
    searchTerm,

    ...hotelList,

    fetchFilteredHotels,
    handleSort: handleSort,
  };
};
