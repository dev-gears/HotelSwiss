<template>
  <Drawer
    v-model:visible="showFilters"
    position="bottom"
    :blockScroll="true"
    :pt="{
      root: 'bg-primary dark:bg-primary-200 h-full w-full fixed bottom-0 left-0 rounded-t-3xl transition-all !h-[90%] shadow-xl dark:shadow-primary-200/20',
      header:
        'bg-light dark:bg-dark-200 z-50 border-b border-primary/30 dark:border-primary-200/20 rounded-t-3xl fixed w-full flex !justify-end items-center !py-2 !px-6 shadow-sm dark:shadow-primary-200/10',
      content:
        'bg-light dark:bg-dark-100 !pt-20 rounded-t-3xl overflow-y-scroll flex flex-col gap-6 scrollbar-thin scrollbar-thumb-primary/20 dark:scrollbar-thumb-primary-200/20 scrollbar-track-transparent',
      footer:
        'bg-light dark:bg-dark-200 bottom-0 border-t border-primary/30 dark:border-primary-200/20 !py-2 !px-6 flex justify-between shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] dark:shadow-primary-200/10',
      mask: 'bg-primary/50 dark:bg-dark/70 backdrop-blur-[2px] !transition-all',
      closeButton:
        'text-primary-200 dark:text-light hover:opacity-80 transition-opacity',
    }"
  >
    <template #default v-if="filters">
      <SearchInput
        v-model="searchValue"
        @handleSubmit="submitSearch"
        id="searchInputFilter"
      />
      <SearchFiltersCantons
        v-model="localCantons"
        :cantons="filters?.cantons"
      />
      <SearchFiltersPriceRange
        v-model="localPriceRange"
        :minPrice="filters?.price_range?.from"
        :maxPrice="filters?.price_range?.to"
      />
      <SearchFiltersAmenities
        v-if="filters.amenities.length"
        v-model="localAmenities"
        :amenities="filters.amenities"
      />
      <SearchFiltersClass v-model="localStars" />
    </template>
    <template #footer>
      <div class="container mx-auto flex justify-between">
        <Button
          v-ripple
          :label="$t('Search.filters.clearFilters')"
          :pt="{
            root: 'bg-white p-2 text-primary-200 underline shadow-sm transition-all hover:bg-light-100 hover:shadow-md dark:bg-dark-200 dark:text-light dark:shadow-primary-200/20 dark:hover:bg-dark-100',
          }"
          class=""
          @click="clearFilters"
        />
        <Button
          v-ripple
          :label="$t('Search.filters.searchHotels')"
          :pt="{
            root: '!rounded-lg !bg-primary dark:!bg-primary !p-2 !text-light shadow-md dark:shadow-primary-200/20 transition-all hover:opacity-90 dark:hover:opacity-90',
          }"
          @click="applyFilters"
        />
      </div>
    </template>
  </Drawer>
</template>

<script setup lang="ts">
import type { Canton, Amenity, Filters, PriceRange } from "@/types/hotel";
import { ref, onMounted, type PropType } from "vue";
import { Button } from "#components";
// Import utility function for extracting filters from URL
import { extractFiltersFromUrl } from "~/utils/filter-url-params";

const { filters } = defineProps({
  filters: {
    type: Object as PropType<Filters>,
    required: true,
  },
});

const emit = defineEmits(["clear-filters", "update-filters", "submit-search"]);
const route = useRoute();
const router = useRouter();

const showFilters = ref(false);
const localCantons = ref([]) as Ref<Canton[]>;
const localPriceRange = ref<PriceRange>({ from: null, to: null });
const localAmenities = ref([]) as Ref<number[]>;
const localStars = ref("") as Ref<string>;
const searchValue = ref("");

// Initialize filter values from URL parameters
onMounted(() => {
  initFiltersFromUrl();
});

/**
 * Initialize filters from URL parameters
 */
const initFiltersFromUrl = () => {
  if (!filters) return;

  // Get search value
  if (route.query.q) {
    searchValue.value = route.query.q as string;
  }

  // Get stars
  if (route.query.stars) {
    localStars.value = route.query.stars as string;
  }

  // Get price range
  if (route.query.price_min || route.query.price_max) {
    localPriceRange.value = {
      from: route.query.price_min
        ? parseInt(route.query.price_min as string)
        : null,
      to: route.query.price_max
        ? parseInt(route.query.price_max as string)
        : null,
    };
  }

  // Get cantons from available filters
  if (route.query.cantons && filters?.cantons) {
    const cantonIds = (route.query.cantons as string)
      .split(",")
      .map((id) => parseInt(id));
    localCantons.value = filters.cantons.filter((canton) =>
      cantonIds.includes(canton.id),
    );
  }

  // Get amenities from available filters
  if (route.query.amenities && filters?.amenities) {
    const amenityIds = (route.query.amenities as string)
      .split(",")
      .map((id) => parseInt(id));
    localAmenities.value = amenityIds;
  }
};

/**
 * Clear filters and navigate
 */
const clearFilters = () => {
  clearLocalFilters();
  navigateWithFilters();
};

/**
 * Clear local filters
 */
const clearLocalFilters = () => {
  localCantons.value = [];
  localPriceRange.value = { from: null, to: null };
  localAmenities.value = [];
  localStars.value = "";
  searchValue.value = "";
};

/**
 * Submit search
 */
const submitSearch = () => {
  navigateWithFilters();
  emit("submit-search");
};

/**
 * Apply filters and navigate
 */
const applyFilters = () => {
  showFilters.value = false;
  navigateWithFilters();
};

/**
 * Navigate to search page with current filter values as URL parameters
 */
const navigateWithFilters = async () => {
  // Build query parameters from local filter values
  const query: Record<string, string> = {};

  // Add search term
  if (searchValue.value) {
    query.q = searchValue.value;
  }

  // Add cantons
  if (localCantons.value.length) {
    query.cantons = localCantons.value.map((c) => c.id).join(",");
  }

  // Add stars
  if (localStars.value) {
    query.stars = localStars.value;
  }
  // Add amenities
  if (localAmenities.value.length) {
    query.amenities = localAmenities.value.join(",");
  }

  // Add price range
  if (localPriceRange.value.from !== null) {
    query.price_min = String(localPriceRange.value.from);
  }

  if (localPriceRange.value.to !== null) {
    query.price_max = String(localPriceRange.value.to);
  }

  // Emit update event for compatibility with existing components
  emit("update-filters", {
    cantons: localCantons.value,
    price_range: localPriceRange.value,
    amenities: localAmenities.value,
    stars: localStars.value,
  });

  // Navigate to search page with filters as URL parameters
  if (route.name !== "search") {
    await navigateTo({
      path: "/search",
      query,
    });
  } else {
    // Already on search page, just update the URL
    await router.replace({ query });
  }
};
</script>
