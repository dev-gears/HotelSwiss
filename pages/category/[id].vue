<template>
  <CommonHead
    :title="`Category: ${title}`"
    :description="`Hotels in ${title} category, Switzerland`"
    :url="`/category/${route.params.id}`"
  />
  <div class="container mx-auto px-3 max-sm:px-4">
    <CommonBlockHeader v-if="title" :title="`Category: ${title}`" />
    <CommonGridSection
      :hotels="results"
      :loading="isLoading"
      :loadingMore="loadingMore"
      @sort="handleSort"
      @loadMore="handleLoadMore"
    />
    <div
      v-if="!isLoading && !results.length"
      class="flex h-[50vh] items-center justify-center"
    >
      <h1 class="text-2xl text-primary-100 dark:text-primary-200">
        {{ $t("Common.noResults") }}
      </h1>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import type { Hotel } from "@/types/hotel";

interface ApiResponse {
  results: Hotel[];
  next: string | null;
}

definePageMeta({
  layout: "base",
});

const route = useRoute();
const runtimeConfig = useRuntimeConfig();
const title = ref(route.query.title as string);
const results = ref<Hotel[]>([]);
const nextUrl = ref<string | null>(null);
const isLoading = ref(true);
const loadingMore = ref(false);

/**
 * Fetch hotels based on the category id
 * If the id is "all", fetch all hotels
 * Otherwise, fetch hotels based on the category id
 */
const fetchUrl = computed(() => {
  if (route.params.id === "all") {
    return `/hotels`;
  } else {
    return `/hotels?category_id=${route.params.id}`;
  }
});

try {
  const data = (await $hotelApi(fetchUrl.value)) as ApiResponse;
  results.value = data.results;
  nextUrl.value = data.next;
} catch (error) {
  console.warn(error);
} finally {
  isLoading.value = false;
}

/**
 * Handle sort event from GridSection
 */
const handleSort = async ({
  key,
  value,
}: {
  key: string;
  value: string;
}): Promise<void> => {
  try {
    isLoading.value = true;
    const params = new URLSearchParams({
      [key]: value,
    });
    const data = (await $hotelApi(
      `${fetchUrl.value}&${params.toString()}`,
    )) as ApiResponse;
    results.value = data.results;
    nextUrl.value = data.next;
  } catch (error) {
    console.warn(error);
  } finally {
    isLoading.value = false;
  }
};

/**
 * Handle load more event from GridSection
 */
const handleLoadMore = async () => {
  if (!nextUrl.value || loadingMore.value) return;

  try {
    loadingMore.value = true;
    const data = (await $hotelApi(nextUrl.value)) as ApiResponse;
    results.value = [...results.value, ...data.results];
    nextUrl.value = data.next;
  } catch (error) {
    console.warn(error);
  } finally {
    loadingMore.value = false;
  }
};
</script>
