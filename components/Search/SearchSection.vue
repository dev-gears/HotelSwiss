<template>
  <div class="relative my-8 flex w-full items-center gap-2">
    <SearchInput
      customClassInput="h-12 w-full rounded-l-xl bg-light px-2 text-primary-200 shadow focus:shadow"
      id="searchInput"
    />
    <Button
      icon="pi pi-sliders-h"
      class="flex h-12 rounded-none rounded-br-xl bg-light px-6 shadow [&_span]:text-2xl [&_span]:!text-primary"
      @click="showFilters = true"
    />
  </div>
  <SearchFilters
    v-model:visible="showFilters"
    :filters="firstScreenData?.filters"
    @clear-filters="clearFilters"
    @update-filters="updateFilters"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useFiltersStore } from "@/store/filters";
import { Filters } from "@/types/hotel";

const filtersStore = useFiltersStore();

const showFilters = ref(false);

/**
 * Clear the filters in the store
 */
const clearFilters = () => {
  filtersStore.clearFilters();
};

/**
 * Update the filters in the store
 * @param newFilters
 */
const updateFilters = (newFilters: Filters) => {
  filtersStore.updateFilters(
    newFilters.cantons,
    newFilters.priceRange,
    newFilters.amenities,
    newFilters.stars,
  );
};

const { data: firstScreenData } = await useHotelApiData("/first-screen");
</script>
