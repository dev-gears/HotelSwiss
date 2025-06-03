<template>
  <div v-if="canton" class="rounded-lg bg-light p-6 shadow-md dark:bg-dark-100">
    <!-- Section Header -->
    <div class="mb-8 text-center">
      <h2 class="font-patuaOne text-3xl font-bold text-dark dark:text-light">
        {{ $t("Canton.hotels.title", { name: canton.name }) }}
      </h2>
      <p
        class="mt-4 font-robotoRegular text-lg text-gray-600 dark:text-gray-400"
      >
        {{ $t("Canton.hotels.subtitle") }}
      </p>
    </div>
    <!-- Hotels Grid -->
    <CommonGridSection
      :hotels="hotels"
      :loading="loading"
      :loadingMore="loadingMore"
      :hasMore="hasMore"
      @sort="$emit('sort', $event)"
      @loadMore="$emit('loadMore')"
    />

    <!-- No Hotels Found -->
    <div
      v-if="!loading && !hotels.length"
      class="flex h-60 items-center justify-center"
    >
      <div class="text-center">
        <i class="pi pi-hotel mb-4 text-4xl text-gray-400" />
        <h3 class="mb-2 font-patuaOne text-xl text-dark dark:text-light">
          {{ $t("Canton.hotels.noHotels.title") }}
        </h3>
        <p class="font-robotoRegular text-gray-600 dark:text-gray-400">
          {{ $t("Canton.hotels.noHotels.description", { name: canton.name }) }}
        </p>
        <NuxtLink
          to="/search"
          class="mt-4 inline-block rounded bg-primary px-6 py-3 font-robotoRegular text-light hover:bg-primary/90"
        >
          {{ $t("Canton.hotels.noHotels.searchAll") }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Hotel, Canton, HotelArray } from "@/types/hotel";

defineProps<{
  canton?: Canton;
  hotels: HotelArray;
  loading: boolean;
  loadingMore: boolean;
  hasMore?: boolean;
}>();

defineEmits<{
  loadMore: [];
  sort: [params: { key: string; value: string }];
}>();
</script>
