import { ref } from "vue";
import { fetcher } from "@/services/fetcher";
import categoriesMock from "@/mocks/categories.json";
import hotelsMock from "@/mocks/hotels.json";
import { Category, Hotel } from "@/types/hotel";

type HotelMockType = {
  [key: string]: Hotel[];
};

const useMockData = true; // Toggle this to switch between mock data and API

export const useHotelService = () => {
  const categories = ref<Category[]>([]);
  const hotels = ref<Hotel[]>([]);
  const categorizedHotels = ref<Hotel[]>([]);
  const hotel = ref<Hotel | null>(null);

  const fetchCategories = async () => {
    if (useMockData) {
      categories.value = categoriesMock.data.hotelCategories;
    } else {
      categories.value = await fetcher<Category[]>("/api/categories");
    }
  };

  const fetchCategoryById = async (categoryId: string) => {
    if (useMockData) {
      return categoriesMock.data.hotelCategories.find(
        (category) => category.id === categoryId,
      );
    } else {
      return await fetcher<Category>(`/api/categories/${categoryId}`);
    }
  };

  const fetchHotels = async () => {
    if (useMockData) {
      hotels.value = Object.values(hotelsMock).flat();
    } else {
      hotels.value = await fetcher<Hotel[]>("/api/hotels");
    }
  };

  const fetchHotelsByCategory = async (categoryId: string) => {
    if (useMockData) {
      const category = await fetchCategoryById(categoryId);
      categorizedHotels.value = category
        ? (hotelsMock as HotelMockType)[category.slug] || []
        : [];
    } else {
      categorizedHotels.value = await fetcher<Hotel[]>(
        `/api/hotels?categoryId=${categoryId}`,
      );
    }
  };

  const fetchHotelById = async (hotelId: string) => {
    if (useMockData) {
      const foundHotel = Object.values(hotelsMock)
        .flat()
        .find((h) => h.id === hotelId);
      hotel.value = foundHotel || null;
    } else {
      const fetchedHotel = await fetcher<Hotel>(`/api/hotels/${hotelId}`);
      hotel.value = fetchedHotel;
    }
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
