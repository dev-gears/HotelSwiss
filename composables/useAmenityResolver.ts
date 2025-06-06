import { computed } from "vue";
import type { Amenity } from "@/types/hotel";
import { useAmenitiesData } from "~/utils/api";

/**
 * Composable for resolving amenity IDs to full amenity objects
 * Provides utility functions to convert arrays of amenity IDs to amenity objects
 */
export const useAmenityResolver = () => {
  // Fetch all amenities
  const { data: amenitiesResponse } = useAmenitiesData();

  // Extract amenities from the response
  const amenities = computed(() => amenitiesResponse.value?.results || []);

  /**
   * Resolve a single amenity ID to an amenity object
   * @param id - The amenity ID to resolve
   * @returns The amenity object or undefined if not found
   */
  const resolveAmenity = (id: number): Amenity | undefined => {
    return amenities.value.find((amenity) => amenity.id === id);
  };

  /**
   * Resolve an array of amenity IDs to amenity objects
   * @param ids - Array of amenity IDs to resolve
   * @returns Array of amenity objects (excludes any IDs that couldn't be resolved)
   */
  const resolveAmenities = (ids: number[]): Amenity[] => {
    if (!ids || ids.length === 0) return [];

    return ids
      .map((id) => resolveAmenity(id))
      .filter((amenity): amenity is Amenity => amenity !== undefined);
  };

  /**
   * Check if amenities data is loaded
   */
  const isLoaded = computed(() => !!amenitiesResponse.value);

  return {
    amenities,
    resolveAmenity,
    resolveAmenities,
    isLoaded,
  };
};
