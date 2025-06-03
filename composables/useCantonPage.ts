import { computed } from "vue";
import { useFirstScreenData } from "~/utils/api";
import { useHotelList } from "./useHotelList";

/**
 * Composable for canton page data and hotel management
 * Fetches canton data from first screen data
 * Manages hotel list with canton-specific filters
 * Supports automatic fetching on client-side
 * @param {string} cantonId - The ID of the canton to fetch hotels for
 * @return {Object} - Reactive canton data and hotel list methods
 * @throws {Error} If canton data is not found
 */
export const useCantonPage = (cantonId: string) => {
  const { data: firstScreenData } = useFirstScreenData({
    lazy: false,
  });

  const cantonData = computed(() => {
    return firstScreenData.value?.filters?.cantons?.find(
      (canton: any) => canton.id.toString() === cantonId,
    );
  });
  const hotelList = useHotelList({
    initialFilters: { cantons: cantonId },
    autoFetch: false,
  });

  if (import.meta.client) {
    hotelList.fetchHotelList();
  }

  return {
    cantonData,

    ...hotelList,

    isDataReady: computed(() => !!cantonData.value),
  };
};
