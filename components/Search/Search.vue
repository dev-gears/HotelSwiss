<template>
  <div class="flex w-full items-center px-2">
    <SearchInput />
    <Button
      class="text-secondary ml-1 hidden border bg-primary p-2 md:flex"
      icon="pi pi-search"
    />
    <Dialog
      v-model="showFilters"
      header="Filters"
      :modal="true"
      :visible="showFilters"
      @hide="showFilters = false"
    >
      <p>Filters go here</p>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const searchText = ref("");
const showFilters = ref(false);
</script>
