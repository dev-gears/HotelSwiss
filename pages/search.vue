<template>
  <div class="flex flex-col items-center bg-light-100 dark:bg-dark-100">
    <div class="container mx-auto max-md:px-3">
      <CommonBlockHeader
        v-if="searchTerm"
        :title="`${$t('Search.searchResults')}: ${searchTerm}`"
        class="mb-5 border-b border-primary/30 py-3 font-robotoRegular dark:border-primary-200/20"
      />
      <CommonGridSection
        :hotels="results"
        :loading="isLoading"
        :loadingMore="loadingMore"
        @sort="handleSort"
        @loadMore="handleLoadMore"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type {
  Hotel,
  Canton,
  Amenity,
  HotelListWithPagination,
} from "@/types/hotel";
import { fetchHotels } from "~/utils/api";

definePageMeta({
  layout: "base",
});

const route = useRoute();
const results = ref<Hotel[]>([]);
const nextUrl = ref<string | null>(null);
const isLoading = ref(true);
const loadingMore = ref(false);

// Reactive parameters from URL
const searchTerm = computed(() => (route.query.q as string) || "");

/**
 * Build query parameters directly from URL query
 */
import { buildApiQueryParams } from "~/utils/filter-url-params";

/**
 * Fetch hotels based on URL parameters
 */
const fetchFilteredHotels = async (
  additionalParams: Record<string, string | number | number[]> = {},
) => {
  try {
    isLoading.value = true;
    const params = buildApiQueryParams(route, additionalParams);
    const data = await fetchHotels(params);
    results.value = data.results;
    nextUrl.value = data.next;
  } catch (error) {
    console.warn("Error fetching hotels:", error);
  } finally {
    isLoading.value = false;
  }
};

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
  await fetchFilteredHotels({ [key]: value });
};

/**
 * Handle load more event from GridSection
 */
const handleLoadMore = async () => {
  if (!nextUrl.value || loadingMore.value) return;

  try {
    loadingMore.value = true;

    const data = (await $hotelApi(nextUrl.value)) as HotelListWithPagination;
    results.value = [...results.value, ...data.results];
    nextUrl.value = data.next;
  } catch (error) {
    console.warn("Error loading more results:", error);
  } finally {
    loadingMore.value = false;
  }
};

// Watch for changes in the URL query parameters
watch(
  () => route.query,
  () => {
    fetchFilteredHotels();
  },
  { immediate: true, deep: true },
);
</script>
