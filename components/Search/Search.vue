<template>
  <div class="flex w-full items-center px-2">
    <SearchInput @updateSearchValue="handleSearchValueUpdate" />

    <NuxtLink
      :to="{ path: '/search', query: { value: searchText, filters: [''] } }"
    >
      <Button
        class="ml-1 hidden border bg-primary p-2 text-secondary md:flex"
        icon="pi pi-search"
      />
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const searchText = ref("");

const handleSearchValueUpdate = (newSearchValue: string) => {
  searchText.value = newSearchValue;
};

const handleFiltersUpdate = (newFilters: string[]) => {
  console.log(newFilters);
};
</script>
