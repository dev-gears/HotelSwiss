<template>
  <div
    v-if="category"
    class="rounded-lg bg-light p-6 shadow-md dark:bg-dark-300"
  >
    <div class="mb-6 flex items-center justify-between">
      <h2 class="font-patuaOne text-2xl font-bold text-dark dark:text-light">
        {{ $t("Category.hotels.title", { name: category.name }) }}
      </h2>
      <div class="text-sm text-gray-600 dark:text-gray-400">
        {{ $t("Category.hotels.count", { count: hotels.length }) }}
      </div>
    </div>
    <!-- Hotels Grid -->
    <CommonGridSection
      :hotels="hotels"
      :loading="loading"
      :loadingMore="loadingMore"
      :hasMore="hasMore"
      @sort="handleSort"
      @loadMore="handleLoadMore"
    />

    <!-- No Results State -->
    <div
      v-if="!loading && !hotels.length"
      class="flex h-40 items-center justify-center"
    >
      <div class="text-center">
        <i class="pi pi-home mb-4 text-4xl text-gray-400" />
        <h3
          class="mb-2 font-robotoRegular text-lg text-gray-600 dark:text-gray-400"
        >
          {{ $t("Category.hotels.noHotels") }}
        </h3>
        <p class="font-robotoRegular text-sm text-gray-500 dark:text-gray-500">
          {{
            $t("Category.hotels.noHotelsDescription", { name: category.name })
          }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Category, HotelArray } from "@/types/hotel";

defineProps<{
  category?: Category;
  hotels: HotelArray;
  loading: boolean;
  loadingMore: boolean;
  hasMore?: boolean;
}>();

const emit = defineEmits<{
  sort: [{ key: string; value: string }];
  loadMore: [];
}>();

const handleSort = (params: { key: string; value: string }) => {
  emit("sort", params);
};

const handleLoadMore = () => {
  emit("loadMore");
};
</script>
