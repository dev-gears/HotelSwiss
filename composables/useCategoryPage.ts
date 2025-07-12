import { computed, ref } from "vue";
import { useCategories } from "~/composables/useApi";
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
  // Initialize categories data with lazy approach for production builds
  const categoriesResult = useCategories();

  const categoryData = computed(() => {
    if (categoryId === "all" || !categoriesResult.data?.value?.results)
      return null;
    return categoriesResult.data.value.results.find(
      (category) => category.id.toString() === categoryId,
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
    autoFetch: false,
  });

  if (import.meta.client) {
    hotelList.fetchHotelList();
  }

  return {
    categoryData,
    // Expose categories loading states for better UX
    categoriesData: categoriesResult.data,
    categoriesPending: categoriesResult.pending,
    categoriesError: categoriesResult.error,
    categoriesRefresh: categoriesResult.refresh,

    ...hotelList,

    isDataReady: computed(() => !!categoryData.value || categoryId === "all"),
  };
};
