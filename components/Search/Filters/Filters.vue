<template>
  <Drawer
    v-model:visible="showFilters"
    position="bottom"
    :blockScroll="true"
    :pt="{
      root: 'bg-primary dark:bg-primary-200 h-full w-full fixed bottom-0 left-0 rounded-t-3xl transition-all !h-[90%] shadow-xl dark:shadow-primary-200/20',
      header:
        'bg-light dark:bg-dark-100 z-50 border-b border-primary/30 dark:border-primary-200/20 rounded-t-3xl fixed w-full flex !justify-end items-center !py-2 !px-6 shadow-sm dark:shadow-primary-200/10',
      content:
        'bg-light dark:bg-dark-100 !pt-20 rounded-t-3xl overflow-y-scroll flex flex-col gap-6 scrollbar-thin scrollbar-thumb-primary/20 dark:scrollbar-thumb-primary-200/20 scrollbar-track-transparent',
      footer:
        'bg-light dark:bg-dark-100 bottom-0 border-t border-primary/30 dark:border-primary-200/20 !py-2 !px-6 flex justify-between shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] dark:shadow-primary-200/10',
      mask: 'bg-primary/50 dark:bg-dark/70 backdrop-blur-[2px] !transition-all',
      closeButton:
        'text-primary-200 dark:text-light hover:opacity-80 transition-opacity',
    }"
  >
    <template #default v-if="filters">
      <SearchInput
        v-model="searchValue"
        @handleSubmit="submitSearch"
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
        v-ripple
        :label="$t('Search.filters.clearFilters')"
        class="bg-white p-2 text-primary-200 underline shadow-sm transition-all hover:bg-light-100 hover:shadow-md dark:bg-dark-200 dark:text-light dark:shadow-primary-200/20 dark:hover:bg-dark-100"
        @click="clearFilters"
      />
      <Button
        v-ripple
        :label="$t('Search.filters.searchHotels')"
        :pt="{
          root: '!rounded-lg !bg-primary dark:!bg-primary !p-2 !text-light shadow-md dark:shadow-primary-200/20 transition-all hover:opacity-90 dark:hover:opacity-90',
        }"
        @click="updateFilters"
      />
    </template>
  </Drawer>
</template>

<script setup lang="ts">
import { useFiltersStore } from "@/store/filters";
import type { Canton, Amenity, Filters, PriceRange } from "@/types/hotel";
import { ref, onMounted, onUnmounted } from "vue";

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
const localAmenities = ref([]) as Ref<number[]>;
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
        localAmenities.value = filtersStore.filters.amenities.map((a) => a.id);
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
