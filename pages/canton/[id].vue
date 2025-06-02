<template>
  <CommonHead
    :title="`${cantonData?.name} ${$t('Canton.hero.title')}`"
    :description="`${$t('Canton.hero.subtitle')} ${cantonData?.name}, ${$t('Common.switzerland')}`"
    :url="`/canton/${route.params.id}`"
  />
  <CommonBaseHotelListPage
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
      <CantonHero :canton="cantonData" :hotel-count="totalCount" />
    </template>

    <template #description>
      <CantonDescription :canton="cantonData" />
    </template>

    <template #map>
      <ClientOnly>
        <CantonMap :canton="cantonData" />
        <template #fallback>
          <div class="rounded-lg bg-light p-6 shadow-md dark:bg-dark-300">
            <h2
              class="mb-6 font-patuaOne text-2xl font-bold text-dark dark:text-light"
            >
              {{ $t("Canton.map.title") }}
            </h2>
            <div class="relative h-80 overflow-hidden rounded-lg">
              <div
                class="flex h-full w-full items-center justify-center bg-light-200 dark:bg-dark-200"
              >
                <div class="text-center">
                  <i class="pi pi-map mb-4 text-4xl text-primary" />
                  <p
                    class="font-robotoRegular text-gray-600 dark:text-gray-400"
                  >
                    {{ $t("Common.loading") }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </template>
      </ClientOnly>
    </template>

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
      <CantonHotels
        :canton="cantonData"
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
import { useCantonPage } from "~/composables/useCantonPage";

definePageMeta({
  layout: "base",
});

const route = useRoute();
const cantonId = Array.isArray(route.params.id)
  ? route.params.id[0]
  : route.params.id;

const {
  cantonData,
  hotels,
  isLoading,
  loadingMore,
  totalCount,
  hasMore,
  isDataReady,
  handleSort,
  loadMore,
} = useCantonPage(cantonId);
</script>
