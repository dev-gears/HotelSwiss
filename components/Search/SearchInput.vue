<template>
  <div
    class="relative my-4 flex w-full items-center rounded border border-primary"
  >
    <div class="p-inputgroup flex-1">
      <span class="p-inputgroup-addon">
        <i class="pi pi-search"></i>
      </span>
      <InputText
        placeholder="Search"
        v-model="localSearchText"
        class="pr-[5.2rem] focus:shadow-none"
      />
    </div>
    <Button
      icon="pi pi-filter"
      class="absolute right-0 z-10 w-auto rounded-none border-l border-primary px-1.5 py-2 text-primary"
      label="Filters"
      @click="showFilters = true"
    />
  </div>
  <Dialog
    class="h-screen w-[90%]"
    v-model:visible="showFilters"
    modal
    closable
    dismissableMask
    blockScroll
    showHeader
  >
    <template #header>
      <h3 class="text-primary-100">Filters</h3>
    </template>
    <template #default>
      <SearchFiltersCantons />
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, watch, defineEmits } from "vue";

const localSearchText = ref("");
const showFilters = ref(false);

const emit = defineEmits<{
  (event: "updateSearchValue", payload: string): void;
}>();

watch(localSearchText, (newValue) => {
  emit("updateSearchValue", newValue);
});
</script>
