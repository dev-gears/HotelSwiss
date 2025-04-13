<template>
  <CommonHead
    :title="`Canton: ${title}`"
    :description="`Hotels in ${title} canton, Switzerland`"
    :url="`/canton/${route.params.id}`"
  />
  <div class="container mx-auto px-3 max-sm:px-4">
    <CommonBlockHeader v-if="title" :title="`Canton: ${title}`" />
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
import type { Hotel, HotelListWithPagination } from "@/types/hotel";
import { fetchHotels } from "~/utils/api";

definePageMeta({
  layout: "base",
});

const route = useRoute();
const title = ref(route.query.title as string);
const results = ref<Hotel[]>([]);
const nextUrl = ref<string | null>(null);
const isLoading = ref(true);
const loadingMore = ref(false);

/**
 * Get query parameters for this canton
 */
const getQueryParams = () => ({
  canton_id: Array.isArray(route.params.id)
    ? route.params.id[0]
    : route.params.id,
});

// Initial data fetch
try {
  const data = await fetchHotels(getQueryParams());
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
    const params = {
      ...getQueryParams(),
      [key]: value,
    };
    const data = await fetchHotels(params);
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
    // For pagination links, we still need to use the direct API call
    const data = (await $hotelApi(nextUrl.value)) as HotelListWithPagination;
    results.value = [...results.value, ...data.results];
    nextUrl.value = data.next;
  } catch (error) {
    console.warn(error);
  } finally {
    loadingMore.value = false;
  }
};
</script>
