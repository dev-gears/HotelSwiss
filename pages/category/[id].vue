<template>
  <CommonHead
    :title="`${categoryData?.name} ${$t('Category.hero.subtitle', { count: totalCount })}`"
    :description="`${$t('Category.about.placeholder', { name: categoryData?.name })} ${$t('Common.switzerland')}`"
    :url="`/category/${route.params.id}`"
  />
  <div v-if="isDataReady" class="container mx-auto flex flex-col gap-3 py-3">
    <!-- Hero Section -->
    <CategoryHero :category="categoryData" :hotel-count="totalCount" />

    <!-- Hotels Section -->
    <CategoryHotels
      :category="categoryData"
      :hotels="hotels"
      :loading="isLoading"
      :loading-more="loadingMore"
      :has-more="hasMore"
      @sort="handleSort"
      @load-more="loadMore"
    />
  </div>

  <div v-else class="container mx-auto px-3 py-20 text-center">
    <h1 class="text-2xl text-primary-100 dark:text-primary-200">
      {{ $t("Common.noResults") }}
    </h1>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { useCategoryPage } from "~/composables/useCategoryPage";

definePageMeta({
  layout: "base",
});

const route = useRoute();
const categoryId = Array.isArray(route.params.id)
  ? route.params.id[0]
  : route.params.id;

const {
  categoryData,
  hotels,
  isLoading,
  loadingMore,
  totalCount,
  hasMore,
  isDataReady,
  handleSort,
  loadMore,
} = useCategoryPage(categoryId);
</script>
