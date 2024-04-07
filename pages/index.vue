<template>
  <CommonHead
    title="Hotel Swiss: Discover Luxury"
    description="Explore the finest luxury hotels in Switzerland with Hotel Swiss."
    url="https://hotelswiss.ch"
  />

  <SkeletonLoadersLandingSkeleton v-if="isLoading" />
  <div v-else>
    <PromoBlock
      v-if="firstScreenData?.promo_hotels"
      :hotels="firstScreenData.promo_hotels"
    />
  </div>
  <CategoryTabs
    v-if="firstScreenData?.categories"
    :categories="firstScreenData.categories"
  />
</template>

<script setup lang="ts">
definePageMeta({
  layout: "base",
});

const { data: firstScreenData, pending: isLoading } = await useHotelApiData(
  "/first-screen",
  {
    server: false,
  },
);
</script>
