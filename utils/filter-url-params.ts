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

  if (route.query.q) {
    params.search = route.query.q as string;
  }

  if (route.query.cantons) {
    params.cantons = route.query.cantons as string;
  }

  if (route.query.price_min) {
    params.min_price = route.query.price_min as string;
  }

  if (route.query.price_max) {
    params.max_price = route.query.price_max as string;
  }

  if (route.query.amenities) {
    params.amenities = (route.query.amenities as string)
      .split(",")
      .map((id) => parseInt(id));
  }

  if (route.query.stars) {
    params.stars = route.query.stars as string;
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

  if (filters.stars) {
    query.stars = filters.stars;
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
  const filters: Partial<Filters> = {
    cantons: [],
    amenities: [],
    stars: "",
    price_range: { from: null, to: null },
  };

  let searchTerm = "";

  if (route.query.q) {
    searchTerm = route.query.q as string;
  }

  if (route.query.cantons && availableFilters.cantons?.length) {
    const cantonIds = String(route.query.cantons)
      .split(",")
      .map((id) => parseInt(id));
    filters.cantons = availableFilters.cantons.filter((c) =>
      cantonIds.includes(c.id),
    );
  }

  if (route.query.amenities && availableFilters.amenities?.length) {
    const amenityIds = String(route.query.amenities)
      .split(",")
      .map((id) => parseInt(id));
    filters.amenities = availableFilters.amenities.filter((a) =>
      amenityIds.includes(a.id),
    );
  }

  if (route.query.stars) {
    filters.stars = route.query.stars as string;
  }

  if (route.query.price_min || route.query.price_max) {
    filters.price_range = {
      from: route.query.price_min
        ? parseInt(String(route.query.price_min))
        : null,
      to: route.query.price_max
        ? parseInt(String(route.query.price_max))
        : null,
    };
  }

  return { filters, searchTerm };
};
