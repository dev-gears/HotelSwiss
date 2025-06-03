<template>
  <CommonHead
    :title="`${categoryData?.name} ${$t('Category.hero.subtitle', { count: totalCount })}`"
    :description="`${$t('Category.about.placeholder', { name: categoryData?.name })} ${$t('Common.switzerland')}`"
    :url="`/category/${route.params.id}`"
  />
  <SkeletonLoadersPageSkeleton v-if="!isDataReady" />
  <CommonBaseHotelListPage
    v-else
    :hotels="hotels"
    :is-loading="isLoading"
    :loading-more="loadingMore"
    :has-more="hasMore"
    :total-count="totalCount"
    :is-data-ready="isDataReady"
    :handle-sort="handleSort"
    :load-more="loadMore"
  >
    <template #hero>
      <CategoryHero
        :category="categoryData || undefined"
        :hotel-count="totalCount"
      />
    </template>

    <template #description> </template>

    <template
      #hotels="{
        hotels,
        loading,
        loadingMore,
        hasMore,
        handleSort,
        handleLoadMore,
      }"
    >
      <CategoryHotels
        :category="categoryData || undefined"
        :hotels="hotels"
        :loading="loading"
        :loading-more="loadingMore"
        :has-more="hasMore"
        @sort="handleSort"
        @load-more="handleLoadMore"
      />
    </template>
  </CommonBaseHotelListPage>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { useCategoryPage } from "~/composables/useCategoryPage";
import SkeletonLoadersPageSkeleton from "~/components/SkeletonLoaders/PageSkeleton.vue";

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
