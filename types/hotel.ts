export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
}

export interface Hotel {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
}
