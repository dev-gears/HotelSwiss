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
 * Fetch hotels based on the canton id
 */
const fetchUrl = computed(() => `/hotels?canton_id=${route.params.id}`);

// Use useHotelApiData with proper server-side prerendering support
const fetchHotels = async (url: string) => {
  try {
    isLoading.value = true;

    const { data } = await useHotelApiData(url, {
      server: true, // Enable server-side rendering
      default: () => ref({ results: [], next: null }),
    });

    // Add type checking before accessing properties
    if (data.value && "results" in data.value) {
      results.value = data.value.results || [];
      nextUrl.value = data.value.next || null;
    }
  } catch (error) {
    console.warn("Error fetching hotels:", error);
    results.value = [];
  } finally {
    isLoading.value = false;
  }
};

// Initial fetch
await fetchHotels(fetchUrl.value);

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
  const params = new URLSearchParams({
    [key]: value,
  });
  await fetchHotels(`${fetchUrl.value}&${params.toString()}`);
};

/**
 * Handle load more event from GridSection
 */
const handleLoadMore = async () => {
  if (!nextUrl.value || loadingMore.value) return;

  try {
    loadingMore.value = true;

    // Use client-side for pagination
    const { data } = await useHotelApiData(nextUrl.value, {
      server: false,
    });

    // Add type checking before accessing properties
    if (data.value && 'results' in data.value) {
      results.value = [...results.value, ...data.value.results || []];
      nextUrl.value = data.value.next || null;
    }
  } catch (error) {
    console.warn('Error loading more hotels:', error);
  } finally {
    loadingMore.value = false;
  }
};
</script>
