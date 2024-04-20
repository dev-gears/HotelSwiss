import { defineStore } from "pinia";
import type { Filters } from "@/types/hotel";

interface State {
  filters: Filters;
  searchValue: string;
}

export const useFiltersStore = defineStore({
  id: "filters",
  state: (): State => ({
    filters: {
      cantons: [],
      price_range: { from: undefined, to: undefined },
      amenities: [],
      stars: "",
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
  getters: {
    selectedFiltersCount(): number {
      let count = 0;
      if (this.filters.cantons.length > 0) count += this.filters.cantons.length;
      if (this.filters.amenities.length > 0)
        count += this.filters.amenities.length;
      if (this.filters.stars) count += 1;
      if (this.filters.price_range.from || this.filters.price_range.to)
        count += 1;
      return count;
    },
  },
});
