<template>
  <div class="flex flex-col items-center bg-light-100 dark:bg-dark-100">
    <div class="container mx-auto max-md:px-3">
      <CommonBlockHeader
        v-if="searchedTerm"
        :title="`${$t('Search.searchResults')}: ${searchedTerm}`"
        class="mb-5 border-b border-primary/30 py-3 font-robotoRegular dark:border-primary-200/20"
      />
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
  </div>
</template>

<script setup lang="ts">
import type { Hotel, Canton, Amenity, Filters } from "@/types/hotel";
import { useFiltersStore } from "@/store/filters";

interface ApiResponse {
  results: Hotel[];
  next: string | null;
}

definePageMeta({
  layout: "base",
});

const route = useRoute();
const filtersStore = useFiltersStore();
const results = ref<Hotel[]>([]);
const nextUrl = ref<string | null>(null);
const isLoading = ref(true);
const loadingMore = ref(false);
const searchedTerm = ref("");

/**
 * Build URL parameters from filters
 */
const buildUrlParams = (additionalParams: Record<string, string> = {}) => {
  const params = new URLSearchParams();
  const filters = filtersStore.filters;
  const searchValue = filtersStore.searchValue;

  if (searchValue) {
    params.append("search", searchValue);
    searchedTerm.value = searchValue;
  }

  if (filters.cantons.length) {
    params.append(
      "cantons",
      filters.cantons.map((canton: Canton) => canton.id).join(","),
    );
  }

  if (
    filters.price_range.from !== undefined &&
    filters.price_range.from !== null
  ) {
    params.append("min_price", filters.price_range.from.toString());
  }

  if (filters.price_range.to !== undefined && filters.price_range.to !== null) {
    params.append("max_price", filters.price_range.to.toString());
  }

  if (filters.amenities.length) {
    filters.amenities.forEach((amenity: Amenity) => {
      params.append("amenities", amenity.toString());
    });
  }

  if (filters.stars) {
    params.append("stars", filters.stars);
  }

  // Add any additional parameters (like sort)
  Object.entries(additionalParams).forEach(([key, value]) => {
    params.append(key, value);
  });

  return params;
};

/**
 * Fetch hotels based on search query
 */
const fetchHotels = async (additionalParams: Record<string, string> = {}) => {
  try {
    isLoading.value = true;
    const params = buildUrlParams(additionalParams);
    const data = (await $hotelApi(
      `/hotels?${params.toString()}`,
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
 * Handle sort event from GridSection
 */
const handleSort = async ({
  key,
  value,
}: {
  key: string;
  value: string;
}): Promise<void> => {
  await fetchHotels({ [key]: value });
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

// Initial fetch and watch for filter changes
onMounted(() => {
  fetchHotels();

  // Watch for filter changes
  watch(
    () => [filtersStore.filters, filtersStore.searchValue],
    () => {
      fetchHotels();
    },
    { deep: true },
  );
});
</script>
