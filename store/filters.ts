import { defineStore } from "pinia";
import { Filters } from "@/types/hotel";

export const useFiltersStore = defineStore({
  id: "filters",
  state: () => ({
    filters: {
      cantons: [],
      price_range: { from: undefined, to: undefined },
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
