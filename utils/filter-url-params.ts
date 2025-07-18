import type { Canton, Amenity, PriceRange, Filters } from "@/types/hotel";
import type { RouteLocationNormalizedLoaded } from "vue-router";

/**
 * Extract query parameters from a route object and convert them to API parameters
 * @param route Route object with query parameters
 * @param additionalParams Additional parameters to add
 * @returns Object with API parameters
 */
export const buildApiQueryParams = (
  route: RouteLocationNormalizedLoaded,
  additionalParams: Record<string, string | number | number[]> = {},
): Record<string, string | number | number[]> => {
  const params: Record<string, string | number | number[]> = {};

  // Only add parameters if they exist and are not empty
  if (route.query.q && route.query.q.toString().trim()) {
    params.search = route.query.q as string;
  }

  if (route.query.cantons && route.query.cantons.toString().trim()) {
    params.cantons = route.query.cantons as string;
  }

  if (route.query.price_min && route.query.price_min.toString().trim()) {
    params.min_price = route.query.price_min as string;
  }

  if (route.query.price_max && route.query.price_max.toString().trim()) {
    params.max_price = route.query.price_max as string;
  }

  if (route.query.amenities && route.query.amenities.toString().trim()) {
    const amenityIds = (route.query.amenities as string)
      .split(",")
      .map((id) => parseInt(id))
      .filter((id) => !isNaN(id));

    if (amenityIds.length > 0) {
      params.amenities = amenityIds;
    }
  }

  if (route.query.stars && route.query.stars.toString().trim()) {
    const starIds = (route.query.stars as string)
      .split(",")
      .map((star) => parseInt(star))
      .filter((star) => !isNaN(star));

    if (starIds.length > 0) {
      params.stars = starIds;
    }
  }

  return { ...params, ...additionalParams };
};

/**
 * Build URL query parameters from filter values
 * @param filters Filter values to convert to URL parameters
 * @param searchTerm Optional search term
 * @returns Object with URL query parameters
 */
export const buildUrlQueryParams = (
  filters: Partial<Filters>,
  searchTerm?: string,
): Record<string, string> => {
  const query: Record<string, string> = {};

  if (searchTerm) {
    query.q = searchTerm;
  }

  if (filters.cantons?.length) {
    query.cantons = filters.cantons.map((c) => c.id).join(",");
  }
  if (filters.stars?.length) {
    query.stars = filters.stars.join(",");
  }

  if (filters.amenities?.length) {
    query.amenities = filters.amenities
      .map((a) => (typeof a === "number" ? a : a.id))
      .join(",");
  }

  if (
    filters.price_range?.from !== null &&
    filters.price_range?.from !== undefined
  ) {
    query.price_min = String(filters.price_range.from);
  }

  if (
    filters.price_range?.to !== null &&
    filters.price_range?.to !== undefined
  ) {
    query.price_max = String(filters.price_range.to);
  }

  return query;
};

/**
 * Extract filters from URL query parameters
 * @param route Route object with query parameters
 * @param availableFilters Available filters from API
 * @returns Object with extracted filters and search term
 */
export const extractFiltersFromUrl = (
  route: RouteLocationNormalizedLoaded,
  availableFilters: Filters,
): { filters: Partial<Filters>; searchTerm: string } => {
  try {
    // Initialize with safe defaults to avoid cross-origin issues
    const filters: Partial<Filters> = {
      cantons: [],
      amenities: [],
      stars: [],
      price_range: { from: null, to: null },
    };

    let searchTerm = "";

    // Safely extract query parameters
    if (route.query.q && typeof route.query.q === "string") {
      searchTerm = route.query.q;
    }

    if (route.query.cantons && availableFilters.cantons?.length) {
      try {
        const cantonIds = String(route.query.cantons)
          .split(",")
          .map((id) => parseInt(id))
          .filter((id) => !isNaN(id));

        filters.cantons = availableFilters.cantons.filter((c) =>
          cantonIds.includes(c.id),
        );
      } catch (error) {
        filters.cantons = [];
      }
    }

    if (route.query.amenities && availableFilters.amenities?.length) {
      try {
        const amenityIds = String(route.query.amenities)
          .split(",")
          .map((id) => parseInt(id))
          .filter((id) => !isNaN(id));

        filters.amenities = availableFilters.amenities.filter((a) =>
          amenityIds.includes(a.id),
        );
      } catch (error) {
        filters.amenities = [];
      }
    }

    if (route.query.stars) {
      try {
        const stars = String(route.query.stars).split(",").filter(Boolean);
        filters.stars = stars;
      } catch (error) {
        filters.stars = [];
      }
    }

    if (route.query.price_min || route.query.price_max) {
      try {
        const priceFrom = route.query.price_min
          ? parseInt(String(route.query.price_min))
          : null;
        const priceTo = route.query.price_max
          ? parseInt(String(route.query.price_max))
          : null;

        // Validate price values
        filters.price_range = {
          from: !isNaN(priceFrom as number) ? priceFrom : null,
          to: !isNaN(priceTo as number) ? priceTo : null,
        };
      } catch (error) {
        filters.price_range = { from: null, to: null };
      }
    }

    return { filters, searchTerm };
  } catch (error) {
    // Return safe defaults
    return {
      filters: {
        cantons: [],
        amenities: [],
        stars: [],
        price_range: { from: null, to: null },
      },
      searchTerm: "",
    };
  }
};
