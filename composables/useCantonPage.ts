import { computed, nextTick } from "vue";
import { useCantonData } from "~/utils/api";
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
  const { data: cantonData } = useCantonData(cantonId, {
    lazy: false,
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

    ...hotelList,

    isDataReady: computed(() => !!cantonData.value),
  };
};
