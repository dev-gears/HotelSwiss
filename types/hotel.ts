export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
}

export interface Hotel {
  id: string;
  title: string;
  address: string;
  category: {
    name: string;
    id: string;
  };
  description: string;
  image: string;
}
