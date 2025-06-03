import { computed } from "vue";
import { useFirstScreenData } from "~/utils/api";
import { useHotelList } from "./useHotelList";

/**
 * Composable for category page data and hotel management
 */
export const useCategoryPage = (categoryId: string) => {
  const { data: firstScreenData } = useFirstScreenData({
    lazy: false,
  });

  const categoryData = computed(() => {
    return firstScreenData.value?.categories?.find(
      (category: any) => category.id.toString() === categoryId,
    );
  });
  const getQueryParams = () => {
    if (categoryId === "all") {
      return {};
    } else {
      return { category_id: parseInt(categoryId, 10) };
    }
  };

  const hotelList = useHotelList({
    initialFilters: getQueryParams(),
    autoFetch: true,
  });

  return {
    categoryData,

    ...hotelList,

    isDataReady: computed(() => !!categoryData.value || categoryId === "all"),
  };
};
