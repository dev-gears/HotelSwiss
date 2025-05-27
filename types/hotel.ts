type ID = number;
type Title = string;
type Name = string;
type Description = string;
type URL = string | null;
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
  renditions: {
    thumbnail: URL;
  };
  width: Width;
  height: Height;
  original: URL;
}

export interface PriceRange {
  from: number | null;
  to: number | null;
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

export interface Room {
  type: string;
  value: {
    name: string;
    max_occupants: number;
    amenities: number[];
    images: Image[];
  };
  id: ID;
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
  images: Array<Image>;
  social_links: SocialLink[];
  paid: boolean;
  rooms: Room[];
}

export interface Filters {
  cantons: Canton[];
  price_range: PriceRange;
  amenities: Amenity[];
  stars: string;
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
