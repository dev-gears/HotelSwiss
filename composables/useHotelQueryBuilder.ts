// Types for API query options
interface ApiQueryOptions {
  query?: Record<string, string | number | boolean | number[]>;
  headers?: Record<string, string>;
}

/**
 * Query parameters for hotel searches according to OpenAPI spec
 */
export interface HotelQueryParams {
  amenities?: number[];
  cantons?: string;
  category_id?: number;
  category_name?: string;
  city?: string;
  id?: number;
  max_price?: number;
  min_price?: number;
  stars?: number;

  // Search and pagination
  search?: string;
  page?: number;
  ordering?: string;
}

/**
 * Composable for building hotel API query parameters
 */
export const useHotelQueryBuilder = () => {
  /**
   * Build query parameters for hotel endpoints
   */
  const buildHotelQuery = (params: HotelQueryParams): Record<string, any> => {
    const query: Record<string, any> = {};

    if (params.amenities?.length) {
      query.amenities = params.amenities;
    }

    if (params.cantons) query.cantons = params.cantons;
    if (params.category_name) query.category_name = params.category_name;
    if (params.city) query.city = params.city;
    if (params.search) query.search = params.search;
    if (params.ordering) query.ordering = params.ordering;

    if (params.category_id !== undefined)
      query.category_id = params.category_id;
    if (params.id !== undefined) query.id = params.id;
    if (params.max_price !== undefined) query.max_price = params.max_price;
    if (params.min_price !== undefined) query.min_price = params.min_price;
    if (params.stars !== undefined) query.stars = params.stars;
    if (params.page !== undefined) query.page = params.page;

    return query;
  };

  /**
   * Build API options with hotel query parameters
   */
  const buildHotelApiOptions = (
    params: HotelQueryParams,
    options: ApiQueryOptions = {},
  ): ApiQueryOptions => {
    const query = buildHotelQuery(params);

    return {
      ...options,
      query: {
        ...query,
        ...(options.query || {}),
      },
    };
  };

  /**
   * Validate hotel query parameters
   */
  const validateHotelQuery = (params: HotelQueryParams): string[] => {
    const errors: string[] = [];

    if (params.page !== undefined && params.page < 1) {
      errors.push("Page number must be greater than 0");
    }

    if (params.stars !== undefined && (params.stars < 1 || params.stars > 5)) {
      errors.push("Stars must be between 1 and 5");
    }

    if (params.min_price !== undefined && params.min_price < 0) {
      errors.push("Minimum price cannot be negative");
    }

    if (params.max_price !== undefined && params.max_price < 0) {
      errors.push("Maximum price cannot be negative");
    }

    if (
      params.min_price !== undefined &&
      params.max_price !== undefined &&
      params.min_price > params.max_price
    ) {
      errors.push("Minimum price cannot be greater than maximum price");
    }

    return errors;
  };

  return {
    buildHotelQuery,
    buildHotelApiOptions,
    validateHotelQuery,
  };
};
