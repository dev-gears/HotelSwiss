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
    try {
      // Create a new query object to avoid cross-origin issues
      const query = JSON.parse(JSON.stringify(route.query));

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
        if (!currentValues) {
          return;
        }

        const valuesArray = currentValues.split(",");
        const valueId =
          typeof valueToRemove === "object" && valueToRemove !== null
            ? valueToRemove[idField]?.toString()
            : valueToRemove?.toString();

        if (!valueId) {
          return;
        }

        const newValues = valuesArray.filter((v) => v !== valueId);

        if (newValues.length > 0) {
          query[filterKey] = newValues.join(",");
        } else {
          delete query[filterKey];
        }
      }

      await router.replace({ query });
    } catch (error) {
      console.warn("Error removing filter from URL:", error);
    }
  };

  /**
   * Clear all filters
   */
  const clearAllFilters = async () => {
    try {
      await router.replace({ query: {} });
    } catch (error) {
      console.warn("Error clearing all filters:", error);
    }
  };

  /**
   * Specific filter removal functions with error handling
   */
  const removeSearchTerm = async () => {
    try {
      await removeFilterFromUrl("q");
    } catch (error) {
      console.warn("Error removing search term:", error);
    }
  };

  const removePriceRange = async () => {
    try {
      await removeFilterFromUrl(["price_min", "price_max"]);
    } catch (error) {
      console.warn("Error removing price range:", error);
    }
  };

  const removeCanton = async (canton: any) => {
    try {
      if (canton && canton.id !== undefined && canton.id !== null) {
        await removeFilterFromUrl("cantons", canton);
      }
    } catch (error) {
      console.warn("Error removing canton:", error);
    }
  };

  const removeAmenity = async (amenity: any) => {
    try {
      if (amenity && amenity.id !== undefined && amenity.id !== null) {
        await removeFilterFromUrl("amenities", amenity);
      }
    } catch (error) {
      console.warn("Error removing amenity:", error);
    }
  };

  const removeStar = async (star: string) => {
    try {
      if (star && typeof star === "string") {
        await removeFilterFromUrl("stars", star);
      }
    } catch (error) {
      console.warn("Error removing star:", error);
    }
  };

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
