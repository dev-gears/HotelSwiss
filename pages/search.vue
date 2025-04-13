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
import type {
  Hotel,
  Canton,
  Amenity,
  HotelListWithPagination,
} from "@/types/hotel";
import { useFiltersStore } from "@/store/filters";
import { fetchHotels } from "~/utils/api";

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
 * Build query parameters from filters
 */
const buildQueryParams = (
  additionalParams: Record<string, string | number> = {},
) => {
  const params: Record<string, string | number> = {};
  const filters = filtersStore.filters;
  const searchValue = filtersStore.searchValue;

  if (searchValue) {
    params.search = searchValue;
    searchedTerm.value = searchValue;
  }

  if (filters.cantons.length) {
    params.cantons = filters.cantons
      .map((canton: Canton) => canton.id)
      .join(",");
  }

  if (
    filters.price_range.from !== undefined &&
    filters.price_range.from !== null
  ) {
    params.min_price = filters.price_range.from;
  }

  if (filters.price_range.to !== undefined && filters.price_range.to !== null) {
    params.max_price = filters.price_range.to;
  }

  if (filters.amenities.length) {
    params.amenities = filters.amenities.join(",");
  }

  if (filters.stars) {
    params.stars = filters.stars;
  }

  return { ...params, ...additionalParams };
};

/**
 * Fetch hotels based on search query
 */
const fetchFilteredHotels = async (
  additionalParams: Record<string, string | number> = {},
) => {
  try {
    isLoading.value = true;
    const params = buildQueryParams(additionalParams);
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
    console.warn(error);
  } finally {
    loadingMore.value = false;
  }
};

onMounted(() => {
  filtersStore.initFromUrlParams();

  fetchFilteredHotels();

  watch(
    () => [filtersStore.filters, filtersStore.searchValue],
    () => {
      fetchFilteredHotels();
    },
    { deep: true },
  );

  watch(
    () => route.query,
    () => {
      filtersStore.initFromUrlParams();
    },
    { deep: true },
  );
});
</script>
