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

  const fetchCategories = async () => {
    if (useMockData) {
      categories.value = categoriesMock.data.hotelCategories;
    } else {
      categories.value = await fetcher<Category[]>("/api/categories");
    }
  };

  const fetchHotels = async () => {
    if (useMockData) {
      hotels.value = Object.values(hotelsMock).flat();
    } else {
      hotels.value = await fetcher<Hotel[]>("/api/hotels");
    }
  };

  const fetchHotelsByCategory = async (category: string) => {
    if (useMockData) {
      categorizedHotels.value = (hotelsMock as HotelMockType)[category] || [];
    } else {
      categorizedHotels.value = await fetcher<Hotel[]>(
        `/api/hotels?category=${category}`,
      );
    }
  };

  return {
    fetchCategories,
    fetchHotels,
    fetchHotelsByCategory,
    categories,
    hotels,
    categorizedHotels,
  };
};
