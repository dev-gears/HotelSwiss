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
  <Dialog
    v-model:visible="showFilters"
    modal
    closable
    dismissableMask
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
    <template #header></template>
    <template #default>
      <!-- DA LI ZATVARA FILTERE? -->

      <SearchSearchInputSearch
        customClassInput="h-12 w-full rounded-xl border border-primary/30 bg-light-100 px-2 text-primary-200 shadow-sm"
        class="border-b border-primary/30 pb-5"
        id="searchInputFilter"
      />
      <SearchFiltersCantons :cantons="firstScreenData?.filters?.cantons" />
      <SearchFiltersPriceRange
        :minPrice="firstScreenData?.filters?.price_range?.from"
        :maxPrice="firstScreenData?.filters?.price_range?.to"
      />
      <SearchFiltersAmenities />
      <SearchFiltersClass />
    </template>
    <template #footer>
      <Button
        label="Cancel"
        class="p-button-secondary"
        @click="showFilters = false"
      />
      <Button
        label="Search hotels"
        class="p-button-primary"
        @click="showFilters = false"
      />
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Canton, Amenity } from "@/types/hotel";

const showFilters = ref(false);

const filtered = {
  cantons: [] as Canton[],
  priceRange: [] as number[],
  amenities: [] as Amenity[],
  class: [] as number[],
};

const { data: firstScreenData, pending } =
  await useHotelApiData("/first-screen");
</script>

<style></style>
