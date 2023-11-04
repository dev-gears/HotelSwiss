export interface Category {
  category: {
    id: string;
    name: string;
    slug: string;
    icon: string;
  };
}

export interface Hotel {
  id: string;
  title: string;
  address: string;
  categories: Category[];
  description: string;
  images: HotelImage[];
}

export interface HotelImage {
  image: {
    id: number;
    title: string;
    url: string;
    width: number;
    height: number;
  };
}
