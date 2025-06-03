// Type aliases for common types
type ID = number;
type Title = string;
type Name = string;
type Description = string;
type URL = string | null | undefined;
type Width = number;
type Height = number;
type Telephone = string;
type Email = string;

export interface ImageRenditions {
  thumbnail?: string;
  medium?: string;
  large?: string;
  [key: string]: string | undefined; // Allow for other dynamic rendition sizes
}

export interface Image {
  id: number;
  title: string;
  url: string;
  width: number;
  height: number;
  renditions: ImageRenditions; // More specific than just object, but still flexible
}

export interface PriceRange {
  from: number | null;
  to: number | null;
}

export interface Amenity {
  id: number;
  name: string;
  description?: string; // nullable in API spec
  image: Image;
}

export interface Category {
  id: number;
  name: string;
  image: Image; // Required according to API spec
}

export interface Canton {
  id: number;
  name: string;
  image: Image;
  description: string;
  description_de?: string; // nullable
  description_fr?: string; // nullable
  description_en_us?: string; // nullable
}

export interface CategoryHotelOrderable {
  category: Category;
}

export interface AmenitiesHotelOrderable {
  amenity: Amenity;
}

export interface CategoryWrapper {
  category: Category;
}

export interface CantonWrapper {
  canton: Canton;
}

export interface SocialLink {
  name: string;
  icon: string;
  link: string;
}

export interface Room {
  id: number;
  name: string;
  occupants: number;
  amenities: Amenity; // Single amenity according to API spec
}

export interface EmailRequest {
  subject: string;
  message: string;
  from_email: string;
  recipient_list: string[];
}

export interface EmailResponse {
  success: boolean;
  message: string;
}

export interface Hotel {
  id: number;
  title: string;
  description: string;
  description_de?: string; // nullable
  description_fr?: string; // nullable
  description_en_us?: string; // nullable
  address: string;
  canton: Canton;
  city: string;
  zip?: number; // nullable
  telephone: string;
  fax: string;
  email: string;
  stars: number; // 1-5 range
  start_price: string; // decimal format
  end_price: string; // decimal format
  paid: boolean;
  categories: CategoryHotelOrderable[];
  amenities: AmenitiesHotelOrderable[];
  images: string; // serialized according to API spec
  social_links: any[]; // read-only
  seo: object; // read-only object
  rooms: string; // serialized according to API spec
}

// API Response Types (matching OpenAPI spec exactly)
export interface FiltersResponse {
  cantons: Canton[];
  amenities: Amenity[];
  price_range: Record<string, number>; // API returns this as object with dynamic keys
  stars: number[]; // API returns array of numbers, not strings
}

// Legacy interface for backward compatibility in UI components
export interface Filters {
  cantons: Canton[];
  price_range: PriceRange; // UI-friendly format
  amenities: Amenity[];
  stars: string[]; // UI often handles as strings
}

// Generic paginated response type matching API spec
export interface PaginatedResponse<T> {
  count: number;
  next?: string; // nullable URI
  previous?: string; // nullable URI
  results: T[];
}

export interface HotelListWithPagination extends PaginatedResponse<Hotel> {}

export interface FirstScreenResponse {
  promo_hotels: Hotel[];
  categories: Category[];
  filters: FiltersResponse; // Use the correct API response type
}

// Legacy interface for backward compatibility
export interface FirstScreen {
  promo_hotels: Hotel[];
  categories: Category[];
  all_hotels: Hotel[]; // This field doesn't exist in API but kept for compatibility
  filters: Filters;
}

// Utility types for handling readonly hotels
export type ReadonlyHotel = Readonly<Hotel>;
export type HotelArray = Hotel[] | readonly Hotel[] | ReadonlyHotel[];

// Utility functions to convert between API and UI types
export const convertFiltersResponseToFilters = (
  apiResponse: FiltersResponse,
): Filters => {
  return {
    cantons: apiResponse.cantons,
    amenities: apiResponse.amenities,
    price_range: {
      from: apiResponse.price_range.min ?? null,
      to: apiResponse.price_range.max ?? null,
    },
    stars: apiResponse.stars.map((star) => star.toString()),
  };
};

export const convertFirstScreenResponseToFirstScreen = (
  apiResponse: FirstScreenResponse,
): FirstScreen => {
  return {
    promo_hotels: apiResponse.promo_hotels,
    categories: apiResponse.categories,
    all_hotels: [], // This field doesn't exist in API response
    filters: convertFiltersResponseToFilters(apiResponse.filters),
  };
};
