<template>
  <div class="relative my-8 flex w-full items-center justify-center gap-2">
    <Button
      @click="showFilters = true"
      v-ripple
      :label="$t('Search.searchForSpecificHotel')"
      :pt="{
        root: 'h-12 !flex !justify-between !px-3 w-full overflow-hidden !rounded-l-xl !bg-light px-2 text-primary-200 shadow focus:shadow',
        icon: 'text-primary-200 !text-lg',
      }"
      icon="pi pi-search"
      iconPos="right"
    />
    <Button
      v-ripple
      icon="pi pi-sliders-h"
      :pt="{
        root: 'h-12 items-center justify-center rounded-none !rounded-br-xl !bg-light !px-4 shadow',
        icon: 'text-primary-200 !text-lg',
      }"
      @click="showFilters = true"
    />
    <Badge
      v-if="filtersCount !== '0'"
      :value="filtersCount"
      :pt="{
        root: 'absolute !w-5 !h-5 -right-2 text-md -top-2 !bg-primary !rounded-full !text-light',
      }"
    />
  </div>
  <SearchFilters
    v-model:visible="showFilters"
    :filters="filters"
    @submitSearch="showFilters = false"
    @clearFilters="clearFilters"
    @updateFilters="updateFilters"
  />
  <div
    v-if="filtersCount && route.name === 'search'"
    class="mb-3 border-b border-primary/30 px-3 pb-3"
  >
    <div v-if="filtersStore.filters.cantons.length">
      <div class="mb-2 flex flex-wrap gap-1">
        <Chip
          v-for="canton in filtersStore.filters.cantons"
          :key="canton.id"
          removable
          icon="pi pi-sliders-h"
          :label="canton.name"
          :pt="{
            root: 'cursor-pointer !flex !gap-2 !px-3 !py-2 !rounded-xl !bg-primary !text-light hover:!bg-danger',
          }"
          @click="removeCanton(canton)"
        />
      </div>
    </div>

    <div class="mb-2 flex flex-wrap gap-1">
      <div v-if="filtersStore.filters.stars">
        <Chip
          removable
          icon="pi pi-star"
          :label="filtersStore.filters.stars"
          :pt="{
            root: 'cursor-pointer !flex !gap-2 !px-3 !py-2 !rounded-xl !bg-primary !text-light hover:!bg-danger',
          }"
          @click="removeStars"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useFiltersStore } from "@/store/filters";
import type { Filters } from "@/types/hotel";

const route = useRoute();
const filtersStore = useFiltersStore();
const showFilters = ref(false);
const filtersCount = ref("0");

/**
 * Clear the filters in the store
 */
const clearFilters = () => {
  filtersStore.clearFilters();
};

/**
 * Remove a canton from the filters in the store
 * @param canton
 */
const removeCanton = (canton: { id: number; name: string }) => {
  const newCantons = filtersStore.filters.cantons.filter(
    (c) => c.id !== canton.id,
  );
  filtersStore.updateFilters({ cantons: newCantons });
};

/**
 * Remove the stars from the filters in the store
 */
const removeStars = () => {
  filtersStore.updateFilters({ stars: "" });
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

let unsubscribe: () => void;

/**
 * Subscribe to the filters store to update the filters count
 * when the filters are updated or cleared
 * @returns {void}
 */
onMounted(() => {
  unsubscribe = filtersStore.$onAction(({ name, after }) => {
    if (name === "updateFilters" || name === "clearFilters") {
      after(() => {
        filtersCount.value = filtersStore.selectedFiltersCount.toString();
      });
    }
  });
});

onUnmounted(() => {
  if (unsubscribe) {
    unsubscribe();
  }
});

const { data: filters } = (await useHotelApiData("/filters")) as any;
</script>
