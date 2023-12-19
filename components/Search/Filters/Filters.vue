<template>
  <Dialog
    dismissableMask
    closable
    v-model:visible="showFilters"
    modal
    blockScroll
    :ptOptions="{ mergeSections: false }"
    :pt="{
      root: 'bg-primary h-full w-full fixed bottom-0 left-0',
      header:
        'bg-light z-50 border-b border-primary rounded-t-3xl fixed w-full flex justify-end items-center py-2 px-6',
      content: 'bg-light pt-20 rounded-t-3xl px-7 overflow-y-scroll',
      footer: 'bg-light bottom-0 border-t border-light/40 px-6',
    }"
  >
    <template #default>
      <SearchInput
        @handleSubmit="showFilters = false"
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
      <SearchFiltersAmenities v-model="localAmenities" />
      <SearchFiltersClass v-model="localClass" />
    </template>
    <template #footer>
      <Button
        label="Clear filters"
        class="p-button-secondary"
        @click="clearFilters"
      />
      <Button
        label="Search hotels"
        class="p-button-primary"
        @click="updateFilters"
      />
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useFiltersStore } from "@/store/filters";
import { Canton } from "@/types/hotel";

const { filters } = defineProps<{
  filters: {
    cantons: Array<Canton>;
    price_range: { from: number; to: number };
  };
}>();

const emit = defineEmits(["clear-filters", "update-filters"]);
const filtersStore = useFiltersStore();

const showFilters = ref(false);
const localCantons = ref([]);
const localPriceRange = ref({ from: 0, to: 0 });
const localAmenities = ref([]);
const localClass = ref(null);

const clearFilters = () => {
  filtersStore.clearFilters();
  emit("clear-filters");
};

const updateFilters = () => {
  emit("update-filters", {
    cantons: localCantons.value,
    priceRange: localPriceRange.value,
    amenities: localAmenities.value,
    class: localClass.value,
  });
};
</script>
