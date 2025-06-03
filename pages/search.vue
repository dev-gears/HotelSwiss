<template>
  <div class="flex flex-col items-center bg-light-100 dark:bg-dark-100">
    <CommonHead
      :title="
        searchTerm
          ? `${searchTerm} - Hotel Swiss Search Results`
          : 'Search Hotels - Hotel Swiss'
      "
      :description="
        searchTerm
          ? `Find the best hotels in Switzerland matching '${searchTerm}'. Browse our curated selection of luxury accommodations.`
          : 'Search and discover the finest hotels in Switzerland. Filter by location, amenities, and more.'
      "
      :url="`https://hotelswiss.ch/search?q=${encodeURIComponent(searchTerm || '')}`"
    />
    <!-- Search Results Section -->
    <div class="container mx-auto max-md:px-3">
      <CommonBlockHeader
        v-if="searchTerm"
        :title="`${$t('Search.searchResults')}: ${searchTerm}`"
        class="mb-5 border-b border-primary/30 py-3 font-robotoRegular dark:border-primary-200/20"
      />
      <CommonGridSection
        :hotels="hotels"
        :loading="isLoading"
        :loadingMore="loadingMore"
        :hasMore="hasMore"
        @sort="handleSort"
        @loadMore="loadMore"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSearchPage } from "~/composables/useSearchPage";

definePageMeta({
  layout: "base",
});

const route = useRoute();

const searchTerm = computed(() => (route.query.q as string) || "");

const { hotels, isLoading, loadingMore, hasMore, handleSort, loadMore } =
  useSearchPage();
</script>
