import { defineStore } from "pinia";
import type { Filters, Canton, Amenity, PriceRange } from "@/types/hotel";

interface State {
  filters: Filters;
  searchValue: string;
}

const getInitialState = (): State => ({
  filters: {
    cantons: [],
    price_range: { from: undefined, to: undefined },
    amenities: [],
    stars: "",
  },
  searchValue: "",
});

export const useFiltersStore = defineStore({
  id: "filters",
  state: () => {
    // Using typeof window to check for client-side
    const savedState =
      typeof window !== "undefined"
        ? localStorage.getItem("filters-state")
        : null;
    return savedState ? JSON.parse(savedState) : getInitialState();
  },
  actions: {
    updateFilters(newFilters: Partial<Filters>) {
      this.$patch((state: State) => {
        Object.assign(state.filters, newFilters);
      });
      this.saveToLocalStorage();
      this.updateUrlParams();
    },
    clearFilters() {
      this.$patch((state: State) => {
        Object.assign(state.filters, getInitialState().filters);
      });
      this.saveToLocalStorage();
      this.updateUrlParams();
    },
    setSearchValue(searchValue: string) {
      this.searchValue = searchValue;
      this.saveToLocalStorage();
      this.updateUrlParams();
    },
    saveToLocalStorage() {
      if (typeof window !== "undefined") {
        localStorage.setItem("filters-state", JSON.stringify(this.$state));
      }
    },
    updateUrlParams() {
      if (typeof window !== "undefined") {
        const route = useRoute();
        const router = useRouter();

        if (route.name !== "search") return;

        const query: Record<string, string> = {};

        // Add search value
        if (this.searchValue) {
          query.q = this.searchValue;
        }

        // Add cantons
        if (this.filters.cantons.length) {
          query.cantons = this.filters.cantons
            .map((c: Canton) => c.id)
            .join(",");
        }

        // Add stars
        if (this.filters.stars) {
          query.stars = this.filters.stars;
        }

        // Add amenities
        if (this.filters.amenities.length) {
          query.amenities = this.filters.amenities
            .map((a: Amenity) => a.id)
            .join(",");
        }

        // Add price range
        if (this.filters.price_range.from !== undefined) {
          query.price_min = String(this.filters.price_range.from);
        }
        if (this.filters.price_range.to !== undefined) {
          query.price_max = String(this.filters.price_range.to);
        }

        // Update URL without page reload
        router.replace({ query });
      }
    },
    async initFromUrlParams() {
      if (typeof window !== "undefined") {
        const route = useRoute();

        if (route.name !== "search") return;

        let filtersChanged = false;
        const newFilters: Partial<Filters> = {};

        // Get search value
        if (route.query.q) {
          this.searchValue = String(route.query.q);
          filtersChanged = true;
        }

        // Get cantons
        if (route.query.cantons) {
          const cantonIds = String(route.query.cantons)
            .split(",")
            .map((id) => parseInt(id));

          // Properly fetch cantons data with correct typing
          try {
            // We need to fetch the canton details to properly type them
            const { data: filtersData } = (await useHotelApiData(
              "/filters",
            )) as any;
            if (filtersData?.value?.cantons) {
              const allCantons = filtersData.value.cantons as Canton[];
              newFilters.cantons = allCantons.filter((c) =>
                cantonIds.includes(c.id),
              );
              filtersChanged = true;
            }
          } catch (error) {
            console.error("Error fetching canton data:", error);
          }
        }

        // Get stars
        if (route.query.stars) {
          newFilters.stars = String(route.query.stars);
          filtersChanged = true;
        }

        // Get amenities
        if (route.query.amenities) {
          const amenityIds = String(route.query.amenities)
            .split(",")
            .map((id) => parseInt(id));

          // Properly fetch amenities data with correct typing
          try {
            const { data: filtersData } = (await useHotelApiData(
              "/filters",
            )) as any;
            if (filtersData?.value?.amenities) {
              const allAmenities = filtersData.value.amenities as Amenity[];
              newFilters.amenities = allAmenities.filter((a) =>
                amenityIds.includes(a.id),
              );
              filtersChanged = true;
            }
          } catch (error) {
            console.error("Error fetching amenity data:", error);
          }
        }

        // Get price range
        if (route.query.price_min || route.query.price_max) {
          const priceRange: PriceRange = {
            from: route.query.price_min
              ? parseInt(String(route.query.price_min))
              : undefined,
            to: route.query.price_max
              ? parseInt(String(route.query.price_max))
              : undefined,
          };

          newFilters.price_range = priceRange;
          filtersChanged = true;
        }

        // Update filters if any parameters were found
        if (filtersChanged) {
          this.updateFilters(newFilters);
        }
      }
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
