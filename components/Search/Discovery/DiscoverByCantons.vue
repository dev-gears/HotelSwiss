<template>
  <section id="cantons" class="py-16">
    <div class="container mx-auto px-3">
      <!-- Section Header -->
      <div class="mb-12 text-center">
        <h2 class="font-patuaOne text-3xl font-bold text-dark dark:text-light">
          {{ $t("Discovery.cantons.title") }}
        </h2>
        <p
          class="mt-4 font-robotoRegular text-lg text-gray-600 dark:text-gray-400"
        >
          {{ $t("Discovery.cantons.subtitle") }}
        </p>
      </div>

      <!-- Search Input -->
      <div class="mb-8 flex justify-center">
        <div class="relative w-full max-w-md">
          <i
            class="pi pi-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            v-model="cantonSearchQuery"
            type="text"
            :placeholder="$t('Discovery.cantons.searchPlaceholder')"
            class="w-full rounded-lg border border-gray-200 bg-light py-3 pl-10 pr-4 font-robotoRegular text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-gray-600 dark:bg-dark-100 dark:text-light dark:focus:border-primary"
          />
          <!-- Clear button -->
          <button
            v-if="cantonSearchQuery"
            @click="cantonSearchQuery = ''"
            class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-primary"
          >
            <i class="pi pi-times text-sm" />
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div
        v-if="pending"
        class="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        <div
          v-for="n in 8"
          :key="n"
          class="h-64 animate-pulse rounded-lg bg-light-200 dark:bg-dark-200"
        />
      </div>

      <!-- Error State -->
      <div
        v-else-if="error"
        class="flex h-40 items-center justify-center text-danger"
      >
        <div class="text-center">
          <i class="pi pi-exclamation-triangle mb-2 text-2xl" />
          <p>{{ $t("Common.errorLoading") }}</p>
        </div>
      </div>
      <!-- Cantons Grid -->
      <div
        v-else-if="filteredCantons?.length"
        class="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        <DiscoveryCard
          v-for="canton in filteredCantons"
          :key="canton.id"
          :id="canton.id"
          :title="canton.name"
          :image="canton.image?.url?.toString()"
          type="canton"
          fallback-icon="pi pi-map-marker"
          @click="handleCantonClick"
        />
      </div>

      <!-- No Search Results -->
      <div
        v-else-if="cantonSearchQuery && cantons?.results"
        class="flex h-40 items-center justify-center text-gray-600 dark:text-gray-400"
      >
        <div class="text-center">
          <i class="pi pi-search mb-2 text-2xl" />
          <p class="font-robotoRegular">
            {{
              $t("Discovery.cantons.noSearchResults", {
                query: cantonSearchQuery,
              })
            }}
          </p>
          <button
            @click="cantonSearchQuery = ''"
            class="mt-2 text-sm text-primary hover:underline"
          >
            {{ $t("Common.clearSearch") }}
          </button>
        </div>
      </div>
      <!-- Empty State -->
      <div
        v-else
        class="flex h-40 items-center justify-center text-gray-600 dark:text-gray-400"
      >
        <div class="text-center">
          <i class="pi pi-map-marker mb-2 text-2xl" />
          <p class="font-robotoRegular">
            {{ $t("Discovery.cantons.noCantons") }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useFirstScreenData } from "~/utils/api";
import DiscoveryCard from "./DiscoveryCard.vue";

// Fetch first screen data to get cantons
const {
  data: firstScreen,
  pending,
  error,
} = await useFirstScreenData({
  lazy: false,
});

// Extract cantons from first screen data
const cantons = computed(() => ({
  results: firstScreen.value?.filters?.cantons || [],
}));

// Search functionality
const cantonSearchQuery = ref("");

// Filtered cantons based on search query
const filteredCantons = computed(() => {
  if (!cantonSearchQuery.value.trim()) {
    return cantons.value.results;
  }

  const query = cantonSearchQuery.value.toLowerCase().trim();
  return cantons.value.results.filter((canton) =>
    canton.name.toLowerCase().includes(query),
  );
});

/**
 * Handle canton card click - navigate to individual canton page
 */
const handleCantonClick = (cantonId: number, type: string) => {
  navigateTo(`/canton/${cantonId}`);
};
</script>
