import { computed, watch } from "vue";
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
    () => {
      fetchFilteredHotels();
    },
    { immediate: true, deep: true },
  );

  return {
    searchTerm,

    ...hotelList,

    fetchFilteredHotels,
    handleSort: handleSort,
  };
};
