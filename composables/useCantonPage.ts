import { computed } from "vue";
import { useFirstScreenData } from "~/utils/api";
import { useHotelList } from "./useHotelList";

/**
 * Composable for canton page data and hotel management
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
    initialFilters: { canton_id: cantonId },
    autoFetch: false,
  });

  if (process.client) {
    hotelList.fetchHotelList();
  }

  return {
    cantonData,

    ...hotelList,

    isDataReady: computed(() => !!cantonData.value),
  };
};
