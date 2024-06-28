<template>
  <CommonHead
    :title="hotel?.title ?? 'Default Hotel Title'"
    :description="`Every info you need if staying at ${hotel?.title}`"
    :imageUrl="hotel?.images[0]?.image?.url ?? 'default-image-url.jpg'"
    :url="`https://hotelswiss.ch/hotel/${hotel?.id}`"
  />

  <HotelSkeletonLoader v-if="pending" />
  <div v-else class="bg-light-100">
    <HotelHero :images="hotel?.images" />
    <HotelContent v-if="hotel" :hotel="hotel" />
    <HotelAmenities
      v-if="hotel?.amenities?.length"
      :amenities="hotel?.amenities"
    />
    <HotelSocialNetworks
      v-if="hotel?.social_links"
      :socialLinks="hotel?.social_links"
    />
    <HotelContactFooter
      :startPrice="hotel?.start_price"
      :endPrice="hotel?.end_price"
    />
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";

definePageMeta({
  layout: "single",
});

const route = useRoute();

const { data: hotel, pending } = useHotelApiData(`hotels/${route.params.id}`);
</script>
