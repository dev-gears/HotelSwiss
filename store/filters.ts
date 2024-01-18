import { defineStore } from "pinia";
import { Filters } from "@/types/hotel";

interface PriceRange {
  from: number;
  to: number;
}

export const useFiltersStore = defineStore({
  id: "filters",
  state: () => ({
    filters: {
      cantons: [],
      priceRange: { from: 0, to: 0 },
      amenities: [],
      stars: null,
    },
    searchValue: "",
  }),
  actions: {
    updateFilters(newFilters: Partial<Filters>) {
      this.$patch((state) => {
        Object.assign(state.filters, newFilters);
      });
    },
    clearFilters() {
      this.$reset();
    },
    setSearchValue(searchValue: string) {
      this.searchValue = searchValue;
    },
  },
});
