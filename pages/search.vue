<template>
  <div class="flex flex-col items-center bg-light-100 dark:bg-dark-100">
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
