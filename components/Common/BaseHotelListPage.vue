<template>
  <div v-if="isDataReady" class="container mx-auto flex flex-col gap-3">
    <!-- Hero Section Slot -->
    <slot name="hero" />

    <!-- Description Section Slot -->
    <slot name="description" />

    <!-- Map Section Slot -->
    <slot name="map" />

    <!-- Hotels Section -->
    <slot
      name="hotels"
      :hotels="hotels"
      :loading="isLoading"
      :loading-more="loadingMore"
      :has-more="hasMore"
      :total-count="totalCount"
      :handle-sort="handleSort"
      :handle-load-more="loadMore"
    />
  </div>

  <div v-else class="container mx-auto px-3 py-20 text-center">
    <h1 class="text-2xl text-primary-100 dark:text-primary-200">
      {{ $t("Common.noResults") }}
    </h1>
  </div>
</template>

<script setup lang="ts">
import type { Hotel, HotelArray } from "@/types/hotel";

interface Props {
  hotels: HotelArray;
  isLoading: boolean;
  loadingMore: boolean;
  hasMore: boolean;
  totalCount: number;
  isDataReady: boolean;
  handleSort: (params: { key: string; value: string }) => Promise<void>;
  loadMore: () => Promise<void>;
}

defineProps<Props>();
</script>
