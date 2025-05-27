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
    :filters="filters"
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
          class="to-red-100/50 hover:to-red-200/60 hover:text-danger-600 dark:to-red-800/30 dark:text-red-400 dark:hover:to-red-700/40 h-9 w-9 rounded-full bg-gradient-to-br from-danger/10 p-0 text-danger shadow-sm transition-all hover:scale-105 hover:from-danger/20 hover:shadow-md dark:from-danger/20 dark:hover:from-danger/30"
          @click="clearFiltersFromUrl"
          v-tooltip.top="
            $t('Search.filters.clearAllFilters') || 'Clear All Filters'
          "
        />
      </div>
    </div>
    <div class="space-y-5 p-6 dark:bg-dark-200/50">
      <!-- Search Term Filter -->
      <div v-if="searchTerm" class="filter-group">
        <div class="mb-3 flex items-center gap-2">
          <div
            class="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 shadow-sm ring-2 ring-primary/5 dark:bg-primary-200/25 dark:ring-primary-200/15"
          >
            <i
              class="pi pi-search text-sm font-bold text-primary dark:text-light"
            ></i>
          </div>
          <span
            class="font-robotoRegular text-sm font-medium text-primary-200 dark:text-light"
          >
            {{ $t("Search.searchTerm") || "Search Term" }}
          </span>
        </div>
        <div class="flex flex-wrap gap-2">
          <Chip
            removable
            :label="searchTerm"
            class="modern-chip emerald-chip"
            @remove="removeSearchTermFromUrl"
            :pt="{
              root: '!bg-primary/8 !border-primary/25 hover:!bg-primary/15 dark:!bg-primary-200/20 dark:!border-primary-200/40 dark:hover:!bg-primary-200/30 !text-primary dark:!text-light !rounded-full !px-3 !py-1.5 !text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md',
              removeIcon:
                '!text-primary hover:!text-primary-100 dark:!text-light dark:hover:!text-light/80 !ml-2 transition-colors',
            }"
          />
        </div>
      </div>
      <!-- Cantons Filter -->
      <div v-if="activeFilters.cantons.length" class="filter-group">
        <div class="mb-3 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <div
              class="flex h-7 w-7 items-center justify-center rounded-full bg-primary/15 shadow-sm ring-2 ring-primary/10 dark:bg-primary-200/25 dark:ring-primary-200/15"
            >
              <i
                class="pi pi-map-marker text-sm font-bold text-primary dark:text-light"
              ></i>
            </div>
            <span
              class="font-robotoRegular text-sm font-medium text-primary-200 dark:text-light"
            >
              {{ $t("Search.cantons.title") || "Cantons" }}
            </span>
            <span
              class="rounded-full bg-gradient-to-r from-primary/20 to-primary-200/30 px-3 py-1 text-xs font-bold text-primary shadow-sm ring-1 ring-primary/20 dark:from-primary-200/25 dark:to-primary/35 dark:text-primary-200 dark:ring-primary-200/15"
            >
              {{ activeFilters.cantons.length }}
            </span>
          </div>
        </div>
        <div class="flex flex-wrap gap-2">
          <Chip
            v-for="canton in activeFilters.cantons"
            :key="canton.id"
            removable
            :label="canton.name"
            class="modern-chip primary-chip"
            @remove="removeCantonFromUrl(canton)"
            :pt="{
              root: '!bg-primary/10 !border-primary/30 hover:!bg-primary/18 dark:!bg-primary-200/25 dark:!border-primary-200/50 dark:hover:!bg-primary-200/35 !text-primary dark:!text-light !rounded-full !px-3 !py-1.5 !text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md',
              removeIcon:
                '!text-primary hover:!text-primary-100 dark:!text-light dark:hover:!text-light/80 !ml-2 transition-colors',
            }"
          />
        </div>
      </div>
      <!-- Star Rating Filter -->
      <div v-if="activeFilters.stars" class="filter-group">
        <div class="mb-3 flex items-center gap-2">
          <div
            class="flex h-7 w-7 items-center justify-center rounded-full bg-primary-200/15 shadow-sm ring-2 ring-primary-200/10 dark:bg-primary/25 dark:ring-primary/15"
          >
            <i
              class="pi pi-star text-sm font-bold text-primary-200 dark:text-light"
            ></i>
          </div>
          <span
            class="font-robotoRegular text-sm font-medium text-primary-200 dark:text-light"
          >
            {{ $t("Search.filters.stars") || "Stars" }}
          </span>
        </div>
        <div class="flex flex-wrap gap-2">
          <Chip
            removable
            :label="`${activeFilters.stars} ⭐`"
            class="modern-chip primary-chip"
            @remove="removeStarsFromUrl"
            :pt="{
              root: '!bg-primary-200/10 !border-primary-200/30 hover:!bg-primary-200/18 dark:!bg-primary/25 dark:!border-primary/50 dark:hover:!bg-primary/35 !text-primary-200 dark:!text-light !rounded-full !px-3 !py-1.5 !text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md',
              removeIcon:
                '!text-primary-200 hover:!text-primary dark:!text-light dark:hover:!text-light/80 !ml-2 transition-colors',
            }"
          />
        </div>
      </div>
      <!-- Price Range Filter -->
      <div v-if="hasPriceFilter" class="filter-group">
        <div class="mb-3 flex items-center gap-2">
          <div
            class="flex h-7 w-7 items-center justify-center rounded-full bg-primary/20 shadow-sm ring-2 ring-primary/15 dark:bg-primary-200/20 dark:ring-primary-200/15"
          >
            <i
              class="pi pi-dollar text-sm font-bold text-primary dark:text-light"
            ></i>
          </div>
          <span
            class="font-robotoRegular text-sm font-medium text-primary-200 dark:text-light"
          >
            {{ $t("Search.priceRange.title") || "Price Range" }}
          </span>
        </div>
        <div class="flex flex-wrap gap-2">
          <Chip
            removable
            :label="formatPriceRange"
            class="modern-chip primary-chip"
            @remove="removePriceRangeFromUrl"
            :pt="{
              root: '!bg-primary/12 !border-primary/35 hover:!bg-primary/20 dark:!bg-primary-200/25 dark:!border-primary-200/50 dark:hover:!bg-primary-200/35 !text-primary dark:!text-light !rounded-full !px-3 !py-1.5 !text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md',
              removeIcon:
                '!text-primary hover:!text-primary-100 dark:!text-light dark:hover:!text-light/80 !ml-2 transition-colors',
            }"
          />
        </div>
      </div>

      <!-- Amenities Filter -->
      <div v-if="activeFilters.amenities.length" class="filter-group">
        <div class="mb-3 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <div
              class="flex h-7 w-7 items-center justify-center rounded-full bg-primary/20 shadow-sm ring-2 ring-primary-100/15 dark:bg-primary/25 dark:ring-primary/20"
            >
              <i
                class="pi pi-list text-sm font-bold text-primary-100 dark:text-light"
              ></i>
            </div>
            <span
              class="font-robotoRegular text-sm font-medium text-primary-200 dark:text-light"
            >
              {{ $t("Search.amenities.title") || "Amenities" }}
            </span>
            <span
              class="rounded-full bg-gradient-to-r from-primary-100/20 to-primary/30 px-3 py-1 text-xs font-bold text-primary-100 shadow-sm ring-1 ring-primary-100/20 dark:from-primary/25 dark:to-primary-200/35 dark:text-primary dark:ring-primary/15"
            >
              {{ activeFilters.amenities.length }}
            </span>
          </div>
          <Button
            v-if="activeFilters.amenities.length > 3"
            @click="showAllAmenities = !showAllAmenities"
            variant="text"
            size="small"
            class="h-7 rounded-full bg-gradient-to-r from-primary-100/15 to-primary/25 px-3 text-xs font-semibold text-primary-100 shadow-sm transition-all hover:from-primary-100/25 hover:to-primary/35 hover:shadow-md dark:from-primary/20 dark:to-primary-200/30 dark:text-primary dark:hover:from-primary/30 dark:hover:to-primary-200/40"
            :label="
              showAllAmenities
                ? 'Show Less'
                : `+${activeFilters.amenities.length - 3} more`
            "
          />
        </div>
        <div class="flex flex-wrap gap-2">
          <Chip
            v-for="(amenity, index) in displayedAmenities"
            :key="amenity.id"
            removable
            :label="amenity.name"
            class="modern-chip primary-chip"
            @remove="removeAmenityFromUrl(amenity)"
            :pt="{
              root: '!bg-primary/12 !border-primary-100/35 hover:!bg-primary/20 dark:!bg-primary/25 dark:!border-primary/50 dark:hover:!bg-primary/35 !text-primary-100 dark:!text-light !rounded-full !px-3 !py-1.5 !text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md',
              removeIcon:
                '!text-primary-100 hover:!text-primary dark:!text-light dark:hover:!text-light/80 !ml-2 transition-colors',
            }"
          />
        </div>
      </div>
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
            class="pi pi-info-circle text-blue-500 dark:text-blue-400 mr-1"
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
import { ref, computed, onMounted, watch } from "vue";
import type { Canton, Amenity, Filters } from "@/types/hotel";
import SearchFilters from "~/components/Search/Filters/SearchFilters.vue";
import Chip from "primevue/chip";
// Import utility function for extracting filters from URL
import { extractFiltersFromUrl } from "~/utils/filter-url-params";

const route = useRoute();
const router = useRouter();
const showFilters = ref(false);
const showAllAmenities = ref(false);

// Define reactive filters based on URL params
const searchTerm = computed(() => (route.query.q as string) || "");
const activeFilters = ref<{
  cantons: Canton[];
  amenities: Amenity[];
  stars: string;
  price_range: { from: number | null; to: number | null };
}>({
  cantons: [],
  amenities: [],
  stars: "",
  price_range: { from: null, to: null },
});

// Computed property for displayed amenities (with show more/less functionality)
const displayedAmenities = computed(() => {
  if (showAllAmenities.value || activeFilters.value.amenities.length <= 3) {
    return activeFilters.value.amenities;
  }
  return activeFilters.value.amenities.slice(0, 3);
});

// Count of active filters
const activeFiltersCount = computed(() => {
  let count = 0;
  if (activeFilters.value.cantons.length > 0)
    count += activeFilters.value.cantons.length;
  if (activeFilters.value.amenities.length > 0)
    count += activeFilters.value.amenities.length;
  if (activeFilters.value.stars) count += 1;
  if (hasPriceFilter.value) count += 1;
  if (searchTerm.value) count += 1;
  return count;
});

// Check if price filter is active
const hasPriceFilter = computed(() => {
  const { from, to } = activeFilters.value.price_range;
  return from !== null || to !== null;
});

// Format price range for display
const formatPriceRange = computed(() => {
  const { from, to } = activeFilters.value.price_range;

  if (from !== null && to !== null) {
    return `${from} - ${to} CHF`;
  } else if (from !== null) {
    return `${from}+ CHF`;
  } else if (to !== null) {
    return `Up to ${to} CHF`;
  }

  return "";
});

// Check if current page is search page
const isSearchPage = computed(() => {
  return typeof route.name === "string" && route.name.startsWith("search");
});

// Filter data from API
const { data: filters } = (await useHotelApiData("/filters")) as any;

// Update active filters from URL parameters
const updateFiltersFromUrl = async () => {
  if (!filters?.value) return;

  const { filters: extractedFilters } = extractFiltersFromUrl(
    route,
    filters.value,
  );

  // Update active filters
  activeFilters.value = {
    cantons: extractedFilters.cantons || [],
    amenities: extractedFilters.amenities || [],
    stars: extractedFilters.stars || "",
    price_range: extractedFilters.price_range || { from: null, to: null },
  };
};

// Handle filters update from FiltersWithoutStore component
const handleFiltersUpdate = (newFilters: Filters) => {
  showFilters.value = false;
  // The filter component already handles the URL navigation
};

// Clear all filters by removing all URL parameters
const clearFiltersFromUrl = async () => {
  await router.replace({ query: {} });
};

// Remove canton filter
const removeCantonFromUrl = async (canton: Canton) => {
  const newCantons = activeFilters.value.cantons
    .filter((c) => c.id !== canton.id)
    .map((c) => c.id);

  const query = { ...route.query };

  if (newCantons.length) {
    query.cantons = newCantons.join(",");
  } else {
    delete query.cantons;
  }

  await router.replace({ query });
};

// Remove stars filter
const removeStarsFromUrl = async () => {
  const query = { ...route.query };
  delete query.stars;
  await router.replace({ query });
};

// Remove price range filter
const removePriceRangeFromUrl = async () => {
  const query = { ...route.query };
  delete query.price_min;
  delete query.price_max;
  await router.replace({ query });
};

// Remove amenity filter
const removeAmenityFromUrl = async (amenity: Amenity) => {
  const newAmenities = activeFilters.value.amenities
    .filter((a) => a.id !== amenity.id)
    .map((a) => a.id);

  const query = { ...route.query };

  if (newAmenities.length) {
    query.amenities = newAmenities.join(",");
  } else {
    delete query.amenities;
  }

  await router.replace({ query });
};

// Remove search term
const removeSearchTermFromUrl = async () => {
  const query = { ...route.query };
  delete query.q;
  await router.replace({ query });
};

// Watch for route query changes and update the active filters
watch(
  () => route.query,
  () => {
    updateFiltersFromUrl();
  },
  { immediate: true, deep: true },
);

onMounted(async () => {
  await updateFiltersFromUrl();
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

/* Responsive improvements */
@media (max-width: 640px) {
  :deep(.modern-chip) {
    @apply text-xs;
  }
}
</style>
