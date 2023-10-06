<template>
  <div
    class="relative my-4 flex w-full items-center rounded border border-primary"
  >
    <InputText
      v-model="searchText"
      class="w-full border py-2 pl-7 pr-20 placeholder:ml-5 focus:shadow-sm"
      placeholder="Search"
    />
    <i class="pi pi-search absolute left-0 w-auto p-2 text-gray-300"></i>
    <Button
      icon="pi pi-filter"
      class="absolute right-0 w-auto rounded-none border-l border-primary px-1.5 py-2 text-primary"
      label="Filters"
      @click="showFilters = true"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const searchText = ref("");
const showFilters = ref(false);
</script>
