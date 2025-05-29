import { useRoute, useRouter } from "vue-router";

export const useFilterUrlManagement = () => {
  const route = useRoute();
  const router = useRouter();
  /**
   * Generic function to remove a filter from URL
   */
  const removeFilterFromUrl = async (
    filterKey: string | string[],
    valueToRemove?: any,
    idField = "id",
  ) => {
    const query = { ...route.query };

    if (valueToRemove === undefined) {
      // Remove entire filter (e.g., price range, search term)
      if (Array.isArray(filterKey)) {
        // Remove multiple keys (e.g., price_min and price_max)
        filterKey.forEach((key) => delete query[key]);
      } else {
        delete query[filterKey];
      }
    } else {
      // Remove specific value from array filter
      if (Array.isArray(filterKey)) {
        throw new Error(
          "Cannot remove specific value from multiple filter keys",
        );
      }

      const currentValues = query[filterKey] as string;
      if (!currentValues) return;

      const valuesArray = currentValues.split(",");
      const valueId =
        typeof valueToRemove === "object"
          ? valueToRemove[idField].toString()
          : valueToRemove.toString();

      const newValues = valuesArray.filter((v) => v !== valueId);

      if (newValues.length > 0) {
        query[filterKey] = newValues.join(",");
      } else {
        delete query[filterKey];
      }
    }

    await router.replace({ query });
  };

  /**
   * Clear all filters
   */
  const clearAllFilters = async () => {
    await router.replace({ query: {} });
  };

  /**
   * Specific filter removal functions
   */
  const removeSearchTerm = () => removeFilterFromUrl("q");
  const removePriceRange = () =>
    removeFilterFromUrl(["price_min", "price_max"]);

  const removeCanton = (canton: any) => removeFilterFromUrl("cantons", canton);
  const removeAmenity = (amenity: any) =>
    removeFilterFromUrl("amenities", amenity);
  const removeStar = (star: string) => removeFilterFromUrl("stars", star);

  return {
    removeFilterFromUrl,
    clearAllFilters,
    removeSearchTerm,
    removePriceRange,
    removeCanton,
    removeAmenity,
    removeStar,
  };
};
