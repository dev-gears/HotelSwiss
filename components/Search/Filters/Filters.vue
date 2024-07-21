<template>
  <Dialog
    dismissableMask
    closable
    v-model:visible="showFilters"
    modal
    blockScroll
    :ptOptions="{ mergeSections: false }"
    :pt="{
      root: 'bg-primary h-full w-full fixed bottom-0 left-0 rounded-t-3xl',
      header:
        'bg-light z-50 border-b border-primary/30 rounded-t-3xl fixed w-full flex justify-end items-center py-2 px-6',
      content:
        'bg-light pt-20 rounded-t-3xl px-7 overflow-y-scroll flex flex-col gap-6',
      footer:
        'bg-light bottom-0 border-t border-primary/30 px-6 flex justify-between',
    }"
  >
    <template #default v-if="filters">
      <SearchInput
        v-model="searchValue"
        @handleSubmit="submitSearch"
        customClassInput="h-12 w-full rounded-xl border border-primary/30 bg-light-100 px-2 text-primary-200 shadow-sm"
        class="border-b border-primary/30 pb-5"
        id="searchInputFilter"
      />
      <SearchFiltersCantons
        v-model="localCantons"
        :cantons="filters?.cantons"
      />
      <SearchFiltersPriceRange
        v-model="localPriceRange"
        :minPrice="filters?.price_range?.from"
        :maxPrice="filters?.price_range?.to"
      />
      <SearchFiltersAmenities
        v-if="filters.amenities.length"
        v-model="localAmenities"
        :amenities="filters.amenities"
      />
      <SearchFiltersClass v-model="localStars" />
    </template>
    <template #footer>
      <Button
        label="Clear filters"
        class="bg-white p-2 text-primary-200 underline"
        @click="clearFilters"
      />
      <Button
        label="Search hotels"
        class="bg-primary p-2 text-light-100"
        @click="updateFilters"
      />
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { useFiltersStore } from "@/store/filters";
import type { Canton, Amenity, Filters, PriceRange } from "@/types/hotel";

const { filters } = defineProps({
  filters: {
    type: Object as PropType<Filters>,
    required: true,
  },
});

const emit = defineEmits(["clear-filters", "update-filters", "submit-search"]);
const filtersStore = useFiltersStore();

const showFilters = ref(false);
const localCantons = ref([]) as Ref<Canton[]>;
const localPriceRange = ref({ from: 0, to: 0 }) as Ref<PriceRange>;
const localAmenities = ref([]) as Ref<Amenity[]>;
const localStars = ref("") as Ref<string>;
const searchValue = ref("");

/**
 * Clear filters from the store
 * Emits clear-filters event to parent component
 * Closes the filters dialog and updates filters *
 * @returns {void}
 */
const clearFilters = () => {
  filtersStore.clearFilters();
  clearLocalFilters();
  updateFilters();
};

/**
 * Clear local filters
 * @returns {void}
 */
const clearLocalFilters = () => {
  localCantons.value = [];
  localPriceRange.value = { from: 0, to: 0 };
  localAmenities.value = [];
  localStars.value = "";
};

/**
 * Submit search
 * Emits submit-search event to parent component
 * @returns {void}
 */
const submitSearch = () => {
  updateFilters();
  filtersStore.setSearchValue(searchValue.value);
  emit("submit-search");
};

/**
 * Update filters in the store
 * Emits update-filters event to parent component
 * @returns {void}
 */
const updateFilters = () => {
  emit("update-filters", {
    cantons: localCantons.value,
    price_range: localPriceRange.value,
    amenities: localAmenities.value,
    stars: localStars.value,
  });
};

let unsubscribe: () => void;

onMounted(() => {
  unsubscribe = filtersStore.$onAction(({ name, after }) => {
    if (name === "updateFilters") {
      after(() => {
        searchValue.value = filtersStore.searchValue;
        localCantons.value = filtersStore.filters.cantons;
        localAmenities.value = filtersStore.filters.amenities;
        localStars.value = filtersStore.filters.stars;
      });
    }
  });
});

onUnmounted(() => {
  if (unsubscribe) {
    unsubscribe();
  }
});
</script>
