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
    <Badge
      v-if="filtersCount"
      :value="filtersCount"
      class="absolute -right-2 -top-2 bg-primary"
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
    class="mb-3 border-b border-primary-200"
  >
    <div v-if="filtersStore.filters.cantons.length">
      <div class="mb-2 flex flex-wrap gap-1">
        <Chip
          v-for="canton in filtersStore.filters.cantons"
          :key="canton.id"
          removable
          icon="pi pi-sliders-h"
          :label="canton.name"
          class="cursor-pointer bg-primary text-light hover:bg-danger"
          @click="removeCanton(canton)"
        />
      </div>
    </div>
    <div v-if="filtersStore.filters.stars">
      <Chip
        removable
        icon="pi pi-star"
        :label="filtersStore.filters.stars"
        class="mb-2 cursor-pointer bg-primary text-light hover:bg-danger"
        @click="removeStars"
      />
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
const filtersCount = ref(0);

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

onMounted(() => {
  unsubscribe = filtersStore.$onAction(({ name, after }) => {
    if (name === "updateFilters") {
      after(() => {
        filtersCount.value = filtersStore.selectedFiltersCount;
      });
    }
  });
});

onUnmounted(() => {
  if (unsubscribe) {
    unsubscribe();
  }
});

const { data: filters } = await useHotelApiData("/filters");
</script>
