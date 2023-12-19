import { defineStore } from "pinia";

interface PriceRange {
  from: number;
  to: number;
}

export const useFiltersStore = defineStore({
  id: "filters",
  state: (): {
    cantons: string[];
    priceRange: PriceRange;
    amenities: string[];
    stars: string | null;
  } => ({
    cantons: [],
    priceRange: { from: 0, to: 0 },
    amenities: [],
    stars: null,
  }),
  actions: {
    setCantons(cantons: string[]) {
      this.cantons = cantons;
    },
    setPriceRange(priceRange: PriceRange) {
      this.priceRange = priceRange;
    },
    setAmenities(amenities: string[]) {
      this.amenities = amenities;
    },
    setClass(stars: string | null) {
      this.stars = stars;
    },
    updateFilters(
      cantons: string[] = [],
      priceRange: PriceRange = { from: 0, to: 0 },
      amenities: string[] = [],
      stars: string | null = null,
    ) {
      this.setCantons(cantons);
      this.setPriceRange(priceRange);
      this.setAmenities(amenities);
      this.setClass(stars);
    },
    clearFilters() {
      this.cantons = [];
      this.priceRange = { from: 0, to: 0 };
      this.amenities = [];
      this.stars = null;
    },
  },
});
