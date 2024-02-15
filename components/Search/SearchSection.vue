<template>
  <div
    class="relative my-8 flex w-full items-center justify-center gap-2 [&_>div]:flex [&_>div]:w-full [&_>div]:bg-light"
  >
    <SearchInput
      customClassInput="h-12 w-full rounded-l-xl bg-light px-2 text-primary-200 shadow focus:shadow"
      id="searchInput"
    />
    <Button
      icon="pi pi-sliders-h"
      class="flex h-12 items-center justify-center rounded-none rounded-br-xl bg-light px-6 shadow [&_span]:text-2xl [&_span]:!text-primary"
      @click="showFilters = true"
    />
  </div>
  <SearchFilters
    v-model:visible="showFilters"
    :filters="filters"
    @submitSearch="showFilters = false"
    @clearFilters="clearFilters"
    @updateFilters="updateFilters"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useFiltersStore } from "@/store/filters";
import { Filters } from "@/types/hotel";

const route = useRoute();
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
const updateFilters = async (newFilters: Filters) => {
  showFilters.value = false;
  filtersStore.updateFilters(newFilters);

  if (route.name !== "search") {
    await navigateTo(`/search`);
  }
};

const { data: filters } = await useHotelApiData("/filters");
</script>
