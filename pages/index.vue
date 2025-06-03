<template>
  <CommonHead
    title="Hotel Swiss: Discover Luxury Hotels in Switzerland"
    description="Explore the finest luxury hotels in Switzerland with Hotel Swiss. Find the perfect accommodation for your Swiss holiday."
    url="/"
    keywords="luxury hotels, Switzerland hotels, hotel booking, Swiss accommodations, vacation in Switzerland"
    :structuredDataType="'website'"
  />
  <Slider
    v-if="firstScreenData?.promo_hotels"
    :hotels="firstScreenData.promo_hotels"
  />
  <CategoryTabs
    v-if="firstScreenData?.categories"
    :categories="firstScreenData.categories"
  />
</template>

<script setup lang="ts">
import Slider from "~/components/PromoBlock/Slider.vue";
import { useFirstScreenData } from "~/utils/api";
definePageMeta({
  layout: "base",
});

const { data: firstScreenData } = useFirstScreenData({
  lazy: false,
  cache: false,
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
