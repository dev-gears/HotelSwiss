type ID = number;
type Title = string;
type Name = string;
type Description = string;
type URL = string;
type Width = number;
type Height = number;
type Telephone = string;
type Email = string;

export interface ImageRenditions {
  "400": URL;
  thumbnail: URL;
  medium: URL;
  large: URL;
}

export interface Image {
  id: ID;
  title: Title;
  url: URL;
  width: Width;
  height: Height;
  renditions: ImageRenditions;
}

export interface ImageWrapper {
  image: Image;
}

export interface PriceRange {
  from: number | undefined;
  to: number | undefined;
}

export interface Amenity {
  id: ID;
  name: Name;
  description: Description;
  image: Image;
}

export interface Category {
  id: ID;
  name: Name;
  image?: Image;
}

export interface Canton {
  id: ID;
  name: Name;
  image: Image;
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

export interface Hotel {
  id: ID;
  title: Title;
  description: Description;
  address: string;
  canton: Canton;
  city: string;
  zip: number;
  telephone: Telephone;
  fax: Telephone;
  email: Email;
  stars: number;
  start_price: string;
  end_price: string;
  categories: Array<{ category: Category }>;
  amenities: Array<{ amenity: Amenity }>;
  images: Array<{ image: Image }>;
  social_links: SocialLink[];
}

export interface Filters {
  cantons: Canton[];
  price_range: PriceRange;
  amenities: Amenity[];
  stars: string | null;
}
export interface HotelListWithPagination {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<Hotel>;
}

export interface FirstScreen {
  promo_hotels: Hotel[];
  categories: Category[];
  all_hotels: Hotel[];
  filters: Filters;
}
