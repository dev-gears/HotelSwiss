import { computed, ref } from "vue";
import { useCategoryData } from "~/utils/api";
import { useHotelList } from "./useHotelList";

/**
 * Composable for category page data and hotel management
 * Fetches category data from dedicated category endpoint
 * Manages hotel list with category-specific filters
 * Supports automatic fetching
 * @param {string} categoryId - The ID of the category to fetch hotels for
 * @return {Object} - Reactive category data and hotel list methods
 */
export const useCategoryPage = (categoryId: string) => {
  // Only fetch category data if it's not "all"
  const { data: categoryData } =
    categoryId === "all"
      ? { data: ref(undefined) }
      : useCategoryData(categoryId, {
          lazy: false,
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
    autoFetch: false,
  });

  if (import.meta.client) {
    hotelList.fetchHotelList();
  }

  return {
    categoryData,

    ...hotelList,

    isDataReady: computed(() => !!categoryData.value || categoryId === "all"),
  };
};
