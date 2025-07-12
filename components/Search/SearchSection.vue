<template>
  <div class="relative my-8 flex w-full items-center justify-center gap-2">
    <Button
      @click="showFilters = true"
      v-ripple
      :label="$t('Search.searchForSpecificHotel')"
      variant="text"
      full-width
      icon="pi pi-search"
      icon-pos="right"
      class="h-12 w-full !rounded-l-xl !rounded-r-none !bg-light px-2 text-primary/80 shadow focus:shadow dark:!bg-dark-400 dark:text-light/80 dark:shadow-primary-100/10 dark:hover:!text-light/90"
    />
    <Button
      v-ripple
      icon="pi pi-sliders-h"
      :pt="{
        root: 'h-12 items-center justify-center rounded-none !rounded-br-xl !bg-light dark:!bg-dark-400 !px-4 shadow dark:shadow-primary-100/10',
        icon: 'text-primary-200 dark:text-light/80 !text-lg',
      }"
      @click="showFilters = true"
    />
    <Badge
      v-if="activeFiltersCount !== 0"
      :value="activeFiltersCount"
      class="text-md absolute -right-2 -top-2 !h-5 !w-5 !rounded-full !bg-primary !text-light dark:!bg-primary"
    />
  </div>
  <SearchFilters
    v-model:visible="showFilters"
    :filters="
      filters || {
        cantons: [],
        amenities: [],
        price_range: { from: null, to: null },
        stars: [],
      }
    "
    @submit-search="showFilters = false"
    @clear-filters="clearFiltersFromUrl"
    @update-filters="handleFiltersUpdate"
  />
  <!-- Modern Active Filters Preview -->
  <div
    v-if="activeFiltersCount > 0 && isSearchPage"
    class="mb-6 overflow-hidden rounded-2xl bg-gradient-to-br from-light via-light-100 to-light-200/50 shadow-lg ring-1 ring-primary/10 backdrop-blur-sm transition-all duration-300 hover:shadow-xl dark:from-dark-200 dark:via-dark-300 dark:to-dark-400/80 dark:shadow-2xl dark:ring-primary-200/30"
  >
    <!-- Header with modern design -->
    <div
      class="border-b border-primary/10 bg-light/80 px-6 py-4 backdrop-blur-sm dark:border-primary-200/20 dark:bg-dark-100/90"
    >
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div
            class="to-primary-300 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary via-primary-200 shadow-lg ring-4 ring-primary/20 dark:ring-primary-200/40"
          >
            <i class="pi pi-filter text-lg font-bold text-light"></i>
          </div>
          <div>
            <h3
              class="font-robotoRegular text-lg font-semibold text-primary-200 dark:text-light"
            >
              {{ $t("Search.filters.activeFilters") || "Active Filters" }}
            </h3>
            <p class="text-xs text-primary-200/70 dark:text-light/80">
              {{ activeFiltersCount }}
              {{ activeFiltersCount === 1 ? "filter" : "filters" }} applied
            </p>
          </div>
        </div>
        <Button
          v-ripple
          size="small"
          icon="pi pi-times"
          variant="text"
          class="hover:text-danger-600 h-9 w-9 rounded-full bg-gradient-to-br from-danger/10 to-red-100/50 p-0 text-danger shadow-sm transition-all hover:scale-105 hover:from-danger/20 hover:to-red-200/60 hover:shadow-md dark:from-danger/20 dark:to-red-800/30 dark:text-red-400 dark:hover:from-danger/30 dark:hover:to-red-700/40"
          @click="clearFiltersFromUrl"
          v-tooltip.top="
            $t('Search.filters.clearAllFilters') || 'Clear All Filters'
          "
        />
      </div>
    </div>
    <div class="space-y-5 p-6 dark:bg-dark-200/50">
      <!-- Search Term Filter -->
      <FilterGroup
        v-if="searchTerm"
        title="Search Term"
        icon="pi pi-search"
        :count="1"
        icon-variant="primary"
      >
        <FilterChip
          :label="searchTerm"
          variant="emerald"
          @remove="removeSearchTermFromUrl"
        />
      </FilterGroup>

      <!-- Cantons Filter -->
      <FilterGroup
        :title="$t('Search.cantons.title') || 'Cantons'"
        icon="pi pi-map-marker"
        :count="activeFilters.cantons.length"
        :items="activeFilters.cantons"
        icon-variant="secondary"
      >
        <FilterChip
          v-for="canton in activeFilters.cantons"
          :key="canton.id"
          :label="canton.name"
          variant="primary"
          @remove="removeCantonFromUrl(canton)"
        />
      </FilterGroup>

      <!-- Star Rating Filter -->
      <FilterGroup
        :title="$t('Search.filters.stars') || 'Stars'"
        icon="pi pi-star"
        :count="activeFilters.stars.length"
        :items="activeFilters.stars"
        icon-variant="tertiary"
      >
        <FilterChip
          v-for="star in activeFilters.stars"
          :key="star"
          :label="star === 'all' ? $t('Search.hotelClass.all') : `${star} ⭐`"
          variant="secondary"
          @remove="removeStarFromUrl(star)"
        />
      </FilterGroup>

      <!-- Price Range Filter -->
      <FilterGroup
        v-if="hasPriceFilter"
        :title="$t('Search.priceRange.title') || 'Price Range'"
        icon="pi pi-dollar"
        :count="1"
        icon-variant="quaternary"
      >
        <FilterChip
          :label="formatPriceRange"
          variant="primary"
          @remove="removePriceRangeFromUrl"
        />
      </FilterGroup>

      <!-- Amenities Filter -->
      <FilterGroup
        :title="$t('Search.amenities.title') || 'Amenities'"
        icon="pi pi-list"
        :count="activeFilters.amenities.length"
        :items="activeFilters.amenities"
        icon-variant="quaternary"
      >
        <template #actions>
          <Button
            v-if="activeFilters.amenities.length > 3"
            @click="showAllAmenities = !showAllAmenities"
            variant="text"
            size="small"
            class="h-7 rounded-full bg-gradient-to-r from-primary-100/15 to-primary/25 px-3 text-xs font-semibold text-primary-100 shadow-sm transition-all hover:from-primary-100/25 hover:to-primary/35 hover:shadow-md dark:from-primary/20 dark:to-primary-200/30 dark:text-light dark:hover:from-primary/30 dark:hover:to-primary-200/40"
            :label="
              showAllAmenities
                ? 'Show Less'
                : `+${activeFilters.amenities.length - 3} more`
            "
          />
        </template>
        <FilterChip
          v-for="(amenity, index) in displayedAmenities"
          :key="amenity.id"
          :label="amenity.name"
          variant="primary"
          @remove="removeAmenityFromUrl(amenity)"
        />
      </FilterGroup>
    </div>
    <!-- Modern Footer -->
    <div
      class="border-t border-primary/10 bg-light/50 px-6 py-3 backdrop-blur-sm dark:border-primary-200/25 dark:bg-dark-100/80"
    >
      <div class="flex items-center justify-between">
        <p
          class="font-robotoRegular text-xs text-primary-200/70 dark:text-light/90"
        >
          <i
            class="pi pi-info-circle mr-1 text-blue-500 dark:text-blue-400"
          ></i>
          {{
            $t("Search.filters.tips") || "Click on any filter chip to remove it"
          }}
        </p>
        <div class="flex items-center gap-2">
          <span class="text-xs text-primary-200/70 dark:text-light/90">
            {{ $t("Search.filters.refineSearch") || "Refine your search" }}
          </span>
          <Button
            @click="showFilters = true"
            variant="text"
            size="small"
            icon="pi pi-sliders-h"
            class="h-8 rounded-full bg-gradient-to-r from-primary/20 to-primary-200/30 px-4 text-xs font-bold text-primary shadow-md transition-all hover:scale-105 hover:from-primary/30 hover:to-primary-200/40 hover:shadow-lg dark:from-primary-200/30 dark:to-primary/40 dark:text-light dark:hover:from-primary-200/40 dark:hover:to-primary/50"
            :label="$t('Search.filters.editFilters') || 'Edit'"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, nextTick } from "vue";
import type { Canton, Amenity, Filters } from "@/types/hotel";
import { convertFiltersResponseToFilters } from "@/types/hotel";
import SearchFilters from "~/components/Search/Filters/SearchFilters.vue";
import FilterGroup from "~/components/Search/FilterGroup.vue";
import FilterChip from "~/components/Search/FilterChip.vue";
import Button from "primevue/button";
import Badge from "primevue/badge";
import { useFilters } from "~/composables/useApi";
// Import utility function for extracting filters from URL
import { extractFiltersFromUrl } from "~/utils/filter-url-params";
import { useFilterUrlManagement } from "~/composables/useFilterUrlManagement";
import { safeAssign, safeClone } from "~/utils/safe-object";

// Initialize reactive variables first to avoid lexical declaration issues
const route = useRoute();
const showFilters = ref(false);
const showAllAmenities = ref(false);

// Initialize activeFilters with proper default values to avoid cross-origin issues
const activeFilters = ref<{
  cantons: Canton[];
  amenities: Amenity[];
  stars: string[];
  price_range: { from: number | null; to: number | null };
}>({
  cantons: [],
  amenities: [],
  stars: [],
  price_range: { from: null, to: null },
});

// Use the filter URL management composable - destructure safely
let filterUrlManagement: ReturnType<typeof useFilterUrlManagement>;

try {
  filterUrlManagement = useFilterUrlManagement();
} catch (error) {
  console.warn(
    "Filter URL management composable initialization failed:",
    error,
  );
  // Provide fallback functions
  filterUrlManagement = {
    clearAllFilters: async () => {},
    removeSearchTerm: async () => {},
    removePriceRange: async () => {},
    removeCanton: async () => {},
    removeAmenity: async () => {},
    removeStar: async () => {},
  } as any;
}

const {
  clearAllFilters,
  removeSearchTerm,
  removePriceRange,
  removeCanton,
  removeAmenity,
  removeStar,
} = filterUrlManagement;

// Define reactive computed properties
const searchTerm = computed(() => {
  try {
    return (route.query.q as string) || "";
  } catch (error) {
    console.warn("Error accessing route query:", error);
    return "";
  }
});

// Computed property for displayed amenities (with show more/less functionality)
const displayedAmenities = computed(() => {
  try {
    if (showAllAmenities.value || activeFilters.value.amenities.length <= 3) {
      return activeFilters.value.amenities;
    }
    return activeFilters.value.amenities.slice(0, 3);
  } catch (error) {
    console.warn("Error computing displayed amenities:", error);
    return [];
  }
});

// Count of active filters
const activeFiltersCount = computed(() => {
  try {
    let count = 0;
    if (activeFilters.value.cantons.length > 0)
      count += activeFilters.value.cantons.length;
    if (activeFilters.value.amenities.length > 0)
      count += activeFilters.value.amenities.length;
    if (activeFilters.value.stars.length > 0)
      count += activeFilters.value.stars.length;
    if (hasPriceFilter.value) count += 1;
    if (searchTerm.value) count += 1;
    return count;
  } catch (error) {
    console.warn("Error computing active filters count:", error);
    return 0;
  }
});

// Check if price filter is active
const hasPriceFilter = computed(() => {
  try {
    const { from, to } = activeFilters.value.price_range;
    return from !== null || to !== null;
  } catch (error) {
    console.warn("Error checking price filter:", error);
    return false;
  }
});

// Format price range for display
const formatPriceRange = computed(() => {
  try {
    const { from, to } = activeFilters.value.price_range;

    if (from !== null && to !== null) {
      return `${from} - ${to} CHF`;
    } else if (from !== null) {
      return `${from}+ CHF`;
    } else if (to !== null) {
      return `Up to ${to} CHF`;
    }

    return "";
  } catch (error) {
    console.warn("Error formatting price range:", error);
    return "";
  }
});

// Check if current page is search page
const isSearchPage = computed(() => {
  try {
    return typeof route.name === "string" && route.name.startsWith("search");
  } catch (error) {
    console.warn("Error checking search page:", error);
    return false;
  }
});

// Filter data from API - handle potential initialization issues
let filtersResponse: any;
try {
  const apiResult = await useFilters();
  filtersResponse = apiResult.data;
} catch (error) {
  console.warn("Error fetching filters:", error);
  filtersResponse = ref(null);
}

// Convert API response to UI format with error handling
const filters = computed(() => {
  try {
    return filtersResponse.value
      ? convertFiltersResponseToFilters(filtersResponse.value)
      : null;
  } catch (error) {
    console.warn("Error converting filters response:", error);
    return null;
  }
});

// Update active filters from URL parameters
const updateFiltersFromUrl = async () => {
  try {
    if (!filters.value) return;

    const { filters: extractedFilters } = extractFiltersFromUrl(
      route,
      filters.value,
    );

    // Use safe assignment to avoid cross-origin issues
    const newFilters = safeClone({
      cantons: extractedFilters.cantons || [],
      amenities: extractedFilters.amenities || [],
      stars: extractedFilters.stars || [],
      price_range: extractedFilters.price_range || { from: null, to: null },
    });

    safeAssign(activeFilters.value, newFilters);
  } catch (error) {
    console.warn("Error updating filters from URL:", error);
  }
};

// Handle filters update from FiltersWithoutStore component
const handleFiltersUpdate = (newFilters: Filters) => {
  try {
    showFilters.value = false;
    // The filter component already handles the URL navigation
  } catch (error) {
    console.warn("Error handling filters update:", error);
  }
};

// Create wrapper functions to avoid direct reference issues
const clearFiltersFromUrl = () => {
  try {
    return clearAllFilters();
  } catch (error) {
    console.warn("Error clearing filters:", error);
  }
};

const removeSearchTermFromUrl = () => {
  try {
    return removeSearchTerm();
  } catch (error) {
    console.warn("Error removing search term:", error);
  }
};

const removePriceRangeFromUrl = () => {
  try {
    return removePriceRange();
  } catch (error) {
    console.warn("Error removing price range:", error);
  }
};

const removeCantonFromUrl = (canton: Canton) => {
  try {
    return removeCanton(canton);
  } catch (error) {
    console.warn("Error removing canton:", error);
  }
};

const removeAmenityFromUrl = (amenity: Amenity) => {
  try {
    return removeAmenity(amenity);
  } catch (error) {
    console.warn("Error removing amenity:", error);
  }
};

const removeStarFromUrl = (star: string) => {
  try {
    return removeStar(star);
  } catch (error) {
    console.warn("Error removing star:", error);
  }
};

// Watch for route query changes and update the active filters
watch(
  () => route.query,
  async () => {
    try {
      await nextTick(); // Ensure DOM is updated
      await updateFiltersFromUrl();
    } catch (error) {
      console.warn("Error in route query watcher:", error);
    }
  },
  { immediate: true, deep: true },
);

onMounted(async () => {
  try {
    await nextTick(); // Ensure component is fully mounted
    await updateFiltersFromUrl();
  } catch (error) {
    console.warn("Error in onMounted:", error);
  }
});
</script>

<style lang="pcss" scoped>
/* Filter Group Animation */
.filter-group {
  @apply transform transition-all duration-300 ease-in-out;
  animation: slideInUp 0.3s ease-out;
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Modern Chip Base Styles */
:deep(.modern-chip) {
  @apply cursor-pointer border transition-all duration-200 ease-in-out;
  transform: scale(1);
}

:deep(.modern-chip:hover) {
  transform: scale(1.02);
}

/* Chip Remove Animation */
:deep(.modern-chip.p-chip-removable) {
  animation: chipEnter 0.2s ease-out;
}

@keyframes chipEnter {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Container animations */
.filter-container {
  animation: fadeInScale 0.4s ease-out;
}

@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
