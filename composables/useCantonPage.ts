import { computed, nextTick } from "vue";
import { useCantons } from "~/composables/useApi";
import { useHotelList } from "./useHotelList";

/**
 * Composable for canton page data and hotel management
 * Fetches canton data from dedicated canton endpoint
 * Manages hotel list with canton-specific filters
 * Supports automatic fetching on client-side
 * @param {string} cantonId - The ID of the canton to fetch hotels for
 * @return {Object} - Reactive canton data and hotel list methods
 * @throws {Error} If canton data is not found
 */
export const useCantonPage = (cantonId: string) => {
  // Initialize cantons data with lazy approach for production builds
  const cantonsResult = useCantons();

  const cantonData = computed(() => {
    if (!cantonsResult.data?.value?.results) return null;
    return cantonsResult.data.value.results.find(
      (canton) => canton.id.toString() === cantonId,
    );
  });

  const getQueryParams = () => {
    return { cantons: cantonId };
  };

  const hotelList = useHotelList({
    initialFilters: getQueryParams(),
    autoFetch: false,
  });

  // Only fetch hotels on client side and after component is mounted
  if (import.meta.client) {
    // Use nextTick to ensure DOM is ready
    nextTick(() => {
      hotelList.fetchHotelList();
    });
  }

  return {
    cantonData,
    // Expose cantons loading states for better UX
    cantonsData: cantonsResult.data,
    cantonsPending: cantonsResult.pending,
    cantonsError: cantonsResult.error,
    cantonsRefresh: cantonsResult.refresh,

    ...hotelList,

    isDataReady: computed(() => !!cantonData.value),
  };
};
