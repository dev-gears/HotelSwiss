<template>
  <div class="relative my-8 flex w-full items-center justify-center gap-2">
    <Button
      @click="showFilters = true"
      v-ripple
      :label="$t('Search.searchForSpecificHotel')"
      :pt="{
        root: 'h-12 !flex !justify-between !px-3 w-full overflow-hidden !rounded-l-xl !rounded-r-none !bg-light dark:!bg-dark-400 px-2 text-primary/80 dark:hover:!text-light/90 dark:text-light/80 shadow focus:shadow dark:shadow-primary-100/10',
        icon: 'text-primary/80 dark:text-light/80 !text-lg',
      }"
      icon="pi pi-search"
      iconPos="right"
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
      v-if="filtersCount !== '0'"
      :value="filtersCount"
      :pt="{
        root: 'absolute !w-5 !h-5 -right-2 text-md -top-2 !bg-primary dark:!bg-primary-100 !rounded-full !text-light',
      }"
    />
  </div>
  <SearchFilters
    v-model:visible="showFilters"
    :filters="filters"
    @submitSearch="showFilters = false"
    @clearFilters="clearFilters"
    @updateFilters="updateFilters"
  />
  <div
    v-if="+filtersCount && isSearchPage"
    class="mb-4 rounded-lg border border-primary/20 bg-light-100/50 px-4 py-3 dark:border-primary-100/20 dark:bg-dark-200/50"
  >
    <div class="mb-2 flex items-center justify-between">
      <h3 class="font-robotoRegular text-sm text-primary-200 dark:text-light">
        {{
          $t("Search.filters.activeFilters", filtersCount) ||
          `Active Filters (${filtersCount})`
        }}
      </h3>
      <Button
        v-ripple
        size="small"
        icon="pi pi-times"
        class="rounded-full p-1 text-primary-200 transition-colors hover:bg-light-200 dark:text-light/80 dark:hover:bg-dark-300"
        @click="clearFilters"
        v-tooltip.top="
          $t('Search.filters.clearAllFilters') || 'Clear All Filters'
        "
      />
    </div>

    <div class="flex flex-wrap gap-y-3">
      <!-- Cantons -->
      <div v-if="filtersStore.filters.cantons.length" class="w-full">
        <div class="mb-1 flex items-center gap-2">
          <i
            class="pi pi-map-marker text-xs text-primary-200/70 dark:text-light/70"
          ></i>
          <span class="text-xs text-primary-200/70 dark:text-light/70"
            >{{ $t("Search.cantons.title") || "Cantons" }}:</span
          >
        </div>
        <div class="flex flex-wrap gap-1">
          <Chip
            v-for="canton in filtersStore.filters.cantons"
            :key="canton.id"
            removable
            :label="canton.name"
            :pt="{
              root: 'cursor-pointer !flex !gap-1 !px-2 !py-1 !rounded-lg !bg-primary/90 dark:!bg-primary-100/90 !text-light text-xs hover:!bg-danger dark:hover:!bg-danger-100',
              removeIcon: 'text-light/80 hover:text-light',
            }"
            @remove="removeCanton(canton)"
          />
        </div>
      </div>

      <!-- Star Rating -->
      <div v-if="filtersStore.filters.stars" class="w-full">
        <div class="mb-1 flex items-center gap-2">
          <i
            class="pi pi-star text-xs text-primary-200/70 dark:text-light/70"
          ></i>
          <span class="text-xs text-primary-200/70 dark:text-light/70"
            >{{ $t("Search.filters.stars") || "Stars" }}:</span
          >
        </div>
        <div class="flex flex-wrap gap-1">
          <Chip
            removable
            :label="filtersStore.filters.stars"
            :pt="{
              root: 'cursor-pointer !flex !gap-1 !px-2 !py-1 !rounded-lg !bg-primary/90 dark:!bg-primary-100/90 !text-light text-xs hover:!bg-danger dark:hover:!bg-danger-100',
              removeIcon: 'text-light/80 hover:text-light',
            }"
            @remove="removeStars"
          />
        </div>
      </div>

      <!-- Price Range -->
      <div v-if="hasPriceFilter" class="w-full">
        <div class="mb-1 flex items-center gap-2">
          <i
            class="pi pi-dollar text-xs text-primary-200/70 dark:text-light/70"
          ></i>
          <span class="text-xs text-primary-200/70 dark:text-light/70"
            >{{ $t("Search.filters.priceRange") || "Price Range" }}:</span
          >
        </div>
        <div class="flex flex-wrap gap-1">
          <Chip
            removable
            :label="formatPriceRange"
            :pt="{
              root: 'cursor-pointer !flex !gap-1 !px-2 !py-1 !rounded-lg !bg-primary/90 dark:!bg-primary-100/90 !text-light text-xs hover:!bg-danger dark:hover:!bg-danger-100',
              removeIcon: 'text-light/80 hover:text-light',
            }"
            @remove="removePriceRange"
          />
        </div>
      </div>

      <!-- Amenities -->
      <div v-if="filtersStore.filters.amenities.length" class="w-full">
        <div class="mb-1 flex items-center gap-2">
          <i
            class="pi pi-check-circle text-xs text-primary-200/70 dark:text-light/70"
          ></i>
          <span class="text-xs text-primary-200/70 dark:text-light/70"
            >{{ $t("Search.filters.amenities") || "Amenities" }}:</span
          >
        </div>
        <div class="flex flex-wrap gap-1">
          <Chip
            v-for="amenity in filtersStore.filters.amenities"
            :key="amenity.id"
            removable
            :label="amenity.name"
            :pt="{
              root: 'cursor-pointer !flex !gap-1 !px-2 !py-1 !rounded-lg !bg-primary/90 dark:!bg-primary-100/90 !text-light text-xs hover:!bg-danger dark:hover:!bg-danger-100',
              removeIcon: 'text-light/80 hover:text-light',
            }"
            @remove="removeAmenity(amenity)"
          />
        </div>
      </div>

      <!-- Search term -->
      <div v-if="filtersStore.searchValue" class="w-full">
        <div class="mb-1 flex items-center gap-2">
          <i
            class="pi pi-search text-xs text-primary-200/70 dark:text-light/70"
          ></i>
          <span class="text-xs text-primary-200/70 dark:text-light/70"
            >{{ $t("Search.searchTerm") || "Search Term" }}:</span
          >
        </div>
        <div class="flex flex-wrap gap-1">
          <Chip
            removable
            :label="filtersStore.searchValue"
            :pt="{
              root: 'cursor-pointer !flex !gap-1 !px-2 !py-1 !rounded-lg !bg-primary/90 dark:!bg-primary-100/90 !text-light text-xs hover:!bg-danger dark:hover:!bg-danger-100',
              removeIcon: 'text-light/80 hover:text-light',
            }"
            @remove="clearSearchValue"
          />
        </div>
      </div>
    </div>

    <!-- Interactive tips -->
    <div
      v-if="+filtersCount > 1"
      class="mt-3 border-t border-primary/10 pt-2 dark:border-primary-100/10"
    >
      <p class="text-xs italic text-primary-200/60 dark:text-light/60">
        {{
          $t("Search.filters.tips") || "Tip: Click on any filter to remove it"
        }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useFiltersStore } from "@/store/filters";
import type { Canton, Filters, Amenity } from "@/types/hotel";

const route = useRoute();
const filtersStore = useFiltersStore();
const showFilters = ref(false);
const filtersCount = ref("0");

/**
 * Clear the filters in the store
 */
const clearFilters = () => {
  filtersStore.clearFilters();
};

/**
 * Remove a canton from the filters in the store
 * @param canton
 */
const removeCanton = (canton: Canton) => {
  const newCantons = filtersStore.filters.cantons.filter(
    (c: Canton) => c.id !== canton.id,
  );
  filtersStore.updateFilters({ cantons: newCantons });
};

/**
 * Remove the stars from the filters in the store
 */
const removeStars = () => {
  filtersStore.updateFilters({ stars: "" });
};

/**
 * Remove the price range from the filters in the store
 */
const removePriceRange = () => {
  filtersStore.updateFilters({
    price_range: { from: undefined, to: undefined },
  });
};

/**
 * Remove an amenity from the filters in the store
 * @param amenity
 */
const removeAmenity = (amenity: Amenity) => {
  const newAmenities = filtersStore.filters.amenities.filter(
    (a: Amenity) => a.id !== amenity.id,
  );
  filtersStore.updateFilters({ amenities: newAmenities });
};

/**
 * Clear the search value from the filters in the store
 */
const clearSearchValue = () => {
  filtersStore.setSearchValue("");
};

/**
 * Update the filters in the store
 * @param newFilters
 */
const updateFilters = async (newFilters: Filters) => {
  showFilters.value = false;
  filtersStore.updateFilters(newFilters);

  if (!isSearchPage.value) {
    await navigateTo(`/search`);
  }
};

let unsubscribe: () => void;

/**
 * Subscribe to filter store actions to update the filter count badge
 * This simplified version watches for updateFilters and clearFilters actions
 * and updates the filtersCount value after they complete
 */
unsubscribe = filtersStore.$onAction(
  ({
    name,
    after,
  }: {
    name: string;
    after: (callback: () => void) => void;
  }) => {
    // Only react to these specific actions
    if (name === "updateFilters" || name === "clearFilters") {
      // After the action completes, update the filter count display
      after(() => {
        filtersCount.value = filtersStore.selectedFiltersCount.toString();
      });
    }
  },
);

onUnmounted(() => {
  if (unsubscribe) {
    unsubscribe();
  }
});

const { data: filters } = (await useHotelApiData("/filters")) as any;

/**
 * Check if there is a price filter applied
 */
const hasPriceFilter = computed(() => {
  const { price_range } = filtersStore.filters;
  return (
    price_range &&
    (price_range.from !== undefined || price_range.to !== undefined)
  );
});

/**
 * Format the price range for display
 */
const formatPriceRange = computed(() => {
  const { from, to } = filtersStore.filters.price_range;

  if (from !== undefined && to !== undefined) {
    return `${from} - ${to} CHF`;
  } else if (from !== undefined) {
    return `${from}+ CHF`;
  } else if (to !== undefined) {
    return `Up to ${to} CHF`;
  }

  return "";
});

/**
 * Check if the current page is the search page
 */
const isSearchPage = computed(() => {
  // Handle localized routes by checking if route.name starts with "search"
  return typeof route.name === 'string' && route.name.startsWith('search');
});
</script>
