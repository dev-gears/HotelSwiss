<template>
  <div>
    <div class="container mx-auto">
      <CommonBlockHeader
        :title="`Search results for: ${searchValue}`"
        class="mb-5 border-b border-primary py-3 font-robotoRegular"
      />
      <ClientOnly>
        <SkeletonLoadersSearchSkeleton v-if="isLoading" />
        <div>
          <CommonGridSection
            v-if="searchedHotels?.value.length"
            :hotels="searchedHotels.value"
            :nextUrl="nextUrl"
            :bindIntersection="true"
          />
          <div v-else class="flex h-[50vh] items-center justify-center">
            <h1 class="text-2xl text-primary-100">No results found</h1>
          </div>
        </div>
      </ClientOnly>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { Hotel, Canton, Amenity } from "types/hotel";
import { useFiltersStore } from "@/store/filters";
import { storeToRefs } from "pinia";

definePageMeta({
  layout: "base",
});

const route = useRoute();
const searchedHotels = reactive({ value: [] as Hotel[] });
const isLoading = ref(false);
const nextUrl = ref(null);

// Get filters from the store and add them to the query params
const filtersStore = useFiltersStore();

const { filters, searchValue } = filtersStore;

/**
 * Fetches hotels from the API by search query params
 */
const handleSearch = async () => {
  try {
    console.log("handleSearch");

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

    if (filters.priceRange.from) {
      queryParams.append("min_price", filters.priceRange.from.toString());
    }

    if (filters.priceRange.to) {
      queryParams.append("max_price", filters.priceRange.to.toString());
    }

    if (filters.amenities.length) {
      console.log("filters.amenities", filters.amenities);
      // queryParams.append(
      //   "amenities",
      //   filters.amenities.map((amenity: Amenity) => amenity).join(","),
      // );
      filters.amenities.forEach((amenity: Amenity) => {
        queryParams.append("amenities", amenity.toString());
      });
    }

    if (filters.stars) {
      queryParams.append("stars", filters.stars);
    }

    console.log("queryParams", queryParams.toString());

    const data = await useHotelApiData(`/hotels?${queryParams.toString()}`, {
      cache: false,
    });
    searchedHotels.value = toRef(data.data.value.results);
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
};

let unsubscribe: () => void;

onMounted(() => {
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
