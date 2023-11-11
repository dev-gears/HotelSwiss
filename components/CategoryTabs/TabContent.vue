<template>
  <div class="flex flex-col items-center">
    <CommonBlockHeader :title="name" />
    <CategoryTabsSkeletonLoader v-if="isLoading" />
    <div
      class="flex grid-cols-2 flex-col gap-4 md:grid md:grid-cols-3 lg:grid-cols-4"
      v-else-if="categorizedHotels.length"
    >
      <CardGridCard v-for="hotel in categorizedHotels" :hotel="hotel" />
    </div>
    <div v-else class="flex h-[400px] items-center justify-center">
      No hotels found
    </div>

    <Button
      icon="pi pi-refresh"
      class="mx-auto mt-3 border px-3 py-2"
      label="Load more"
    />
  </div>
</template>
<script setup lang="ts">
import { defineProps } from "vue";

const { id, name, categorizedHotels, isLoading } = defineProps<{
  id: number;
  name: string;
  categorizedHotels: any;
  isLoading: boolean;
}>();
</script>
