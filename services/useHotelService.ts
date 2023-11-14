import { ref } from "vue";
import { fetcher } from "@/services/fetcher";
import { Category, Hotel } from "@/types/hotel";

export const useHotelService = () => {
  const categories = ref<Category[]>([]);
  const hotels = ref<Hotel[]>([]);
  const categorizedHotels = ref<Hotel[]>([]);
  const hotel = ref<Hotel | null>(null);
  const firstScreenData = ref<any>(null);

  const fetchCategories = async () => {
    return await fetcher<Category[]>("/categories");
  };

  const fetchHotels = async () => {
    return await fetcher<Hotel[]>("/hotels");
  };

  const fetchCategoryById = async (categoryId: string) => {
    return await fetcher<Category>(`/categories/${categoryId}`);
  };

  const fetchHotelsByCategory = async (categoryId: string) => {
    return await fetcher<Hotel[]>(`/hotels?category_id=${categoryId}`);
  };

  const fetchHotelById = async (hotelId: string) => {
    return await fetcher<Hotel>(`/hotels/${hotelId}`);
  };

  const fetchFirstScreenData = async () => {
    return await fetcher("/first-screen");
  };

  return {
    fetchCategories,
    fetchCategoryById,
    fetchHotels,
    fetchHotelsByCategory,
    fetchHotelById,
    fetchFirstScreenData,
    firstScreenData,
    categories,
    hotels,
    categorizedHotels,
    hotel,
  };
};
