<template>
  <CommonHead
    title="Hotel Swiss: Discover Luxury"
    description="Explore the finest luxury hotels in Switzerland with Hotel Swiss."
    url="https://hotelswiss.ch"
  />

  <PromoBlock
    class="min-h-[350px]"
    v-if="firstScreenData?.promo_hotels"
    :hotels="firstScreenData.promo_hotels"
  />
  <CategoryTabs
    v-if="firstScreenData?.categories"
    :categories="firstScreenData.categories"
  />
</template>

<script setup lang="ts">
import { useFirstScreenData } from "~/utils/api";

definePageMeta({
  layout: "base",
});

const { data: firstScreenData } = useFirstScreenData({
  lazy: false,
});
</script>

<style>
* {
  --p-ripple-background: #6cc5cf;
}

.light-ripple {
  --p-ripple-background: #f5f5f5 !important;
}
</style>
