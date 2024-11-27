<template>
  <div>
    <div class="container mx-auto px-3 max-sm:px-4">
      <CommonBlockHeader
        v-if="searchedTerm"
        :title="`Search results for: ${searchedTerm}`"
        class="mb-5 border-b border-primary py-3 font-robotoRegular"
      />
      <SkeletonLoadersSearchSkeleton v-if="isLoading" />
      <div v-else>
        <CommonGridSection
          v-if="searchedHotels?.value?.length"
          :hotels="searchedHotels?.value"
          :nextUrl="nextUrl"
        />
        <div v-else class="flex h-[50vh] items-center justify-center">
          <h1 class="text-2xl text-primary-100">
            {{ $t("Search.noResults") }}
          </h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Hotel, Canton, Amenity, Filters } from "@/types/hotel";
import { useFiltersStore } from "@/store/filters";

definePageMeta({
  layout: "base",
});

const searchedHotels = reactive({ value: [] as Hotel[] });
const isLoading = ref(false);
const nextUrl = ref(null);
const searchedTerm = ref("");

// Get filters from the store and add them to the query params
const filtersStore = useFiltersStore();

/**
 * Fetches hotels from the API by search query params
 */
const handleSearch = async () => {
  try {
    const filters: Filters = filtersStore.filters;
    const searchValue = filtersStore.searchValue;

    searchedTerm.value = searchValue;
    isLoading.value = true;
    searchedHotels.value = [];
    const queryParams = new URLSearchParams();

    if (searchValue) {
      queryParams.append("search", searchValue);
    }

    if (filters.cantons.length) {
      queryParams.append(
        "cantons",
        filters.cantons.map((canton: Canton) => canton.id).join(","),
      );
    }

    if (
      filters.price_range.from !== undefined &&
      filters.price_range.from !== null
    ) {
      queryParams.append("min_price", filters.price_range.from.toString());
    }

    if (
      filters.price_range.to !== undefined &&
      filters.price_range.to !== null
    ) {
      queryParams.append("max_price", filters.price_range.to.toString());
    }

    if (filters.amenities.length) {
      filters.amenities.forEach((amenity: Amenity) => {
        queryParams.append("amenities", amenity.toString());
      });
    }

    if (filters.stars) {
      queryParams.append("stars", filters.stars);
    }

    const data = (await useHotelApiData(`/hotels?${queryParams.toString()}`, {
      cache: true,
    })) as any;
    searchedHotels.value = toRef(data?.data?.value?.results);
    nextUrl.value = data?.data?.value?.next;
  } catch (error) {
    console.warn(error);
  } finally {
    isLoading.value = false;
  }
};

let unsubscribe: () => void;

onMounted(() => {
  handleSearch();
  unsubscribe = filtersStore.$onAction(({ name, after }) => {
    if (name === "updateFilters") {
      after(() => {
        handleSearch();
      });
    }
  });
});

onUnmounted(() => {
  if (unsubscribe) {
    unsubscribe();
  }
});
</script>
