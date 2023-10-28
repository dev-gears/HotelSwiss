import { ref } from "vue";
import { fetcher } from "@/services/fetcher";
import { Category, Hotel } from "@/types/hotel";
import { useFetchData } from "@/composables/useFetchData";

export const useHotelService = () => {
  const categories = ref<Category[]>([]);
  const hotels = ref<Hotel[]>([]);
  const categorizedHotels = ref<Hotel[]>([]);
  const hotel = ref<Hotel | null>(null);

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
    return await fetcher<Hotel[]>(`/hotels?categoryId=${categoryId}`);
  };

  const fetchHotelById = async (hotelId: string) => {
    return await fetcher<Hotel>(`/hotels/${hotelId}`);
  };

  return {
    fetchCategories,
    fetchCategoryById,
    fetchHotels,
    fetchHotelsByCategory,
    fetchHotelById,
    categories,
    hotels,
    categorizedHotels,
    hotel,
  };
};
