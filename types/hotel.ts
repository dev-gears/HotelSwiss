export type Category = {
  id: number;
  name: string;
  slug: string;
  icon: string;
};

export interface Hotel {
  id: string;
  title: string;
  address: string;
  city: string;
  categories: Category[];
  description: string;
  images: Image[];
  start_price: string;
  end_price: string;
  stars: number;
  amenities: HotelAmenity[];
}

export interface Image {
  image: {
    id: number;
    title: string;
    url: string;
    width: number;
    height: number;
    renditions: {
      400: string;
      thumbnail: string;
      medium: string;
      large: string;
    };
  };
}

export interface HotelAmenity {
  amenity: {
    id: number;
    name: string;
    description: string;
    image: Image;
  };
}
