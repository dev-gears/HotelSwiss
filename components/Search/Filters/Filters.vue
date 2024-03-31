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
    <template #default>
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
import { ref } from "vue";
import { useFiltersStore } from "@/store/filters";
import type { Canton, Amenity } from "@/types/hotel";

const { filters } = defineProps<{
  filters: {
    cantons: Array<Canton>;
    price_range: { from: number | undefined; to: number | undefined };
    amenities: Array<Amenity>;
    stars: string;
  };
}>();

const emit = defineEmits(["clear-filters", "update-filters", "submit-search"]);
const filtersStore = useFiltersStore();

const showFilters = ref(false);
const localCantons = ref([]);
const localPriceRange = ref({ from: 0, to: 0 });
const localAmenities = ref([]);
const localStars = ref(null);
const searchValue = ref("");

const clearFilters = () => {
  filtersStore.clearFilters();
  emit("clear-filters");
};

const submitSearch = () => {
  updateFilters();
  filtersStore.setSearchValue(searchValue.value);
  emit("submit-search");
};

const updateFilters = () => {
  emit("update-filters", {
    cantons: localCantons.value,
    price_range: localPriceRange.value,
    amenities: localAmenities.value,
    stars: localStars.value,
  });
};
</script>
