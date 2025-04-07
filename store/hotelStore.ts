import { defineStore } from "pinia";
import type { Hotel, Image } from "~/types/hotel";

export const useHotelStore = defineStore("hotel", {
  state: () => ({
    hotel: null as Hotel | null,
    images: [] as Image[] | [],
  }),
  actions: {
    setHotel(hotel: Hotel) {
      this.hotel = hotel;
    },
    setImages(images: Image[] | []) {
      this.images = images;
    },
  },
});
