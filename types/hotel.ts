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
  images: HotelImage[];
  start_price: string;
  end_price: string;
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
