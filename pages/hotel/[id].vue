<template>
  <Head>
    <Title>{{ hotel?.title }}</Title>
    <Meta
      name="description"
      :content="`Every info you need if staying at ${hotel?.title}`"
    />

    <Meta
      property="og:url"
      :content="`https://hotelswiss.ch/hotel/${hotel?.id}`"
    />
    <Meta property="og:title" :content="hotel?.title" />
    <Meta
      property="og:description"
      :content="`Every info you need if staying at ${hotel?.title}`"
    />
    <Meta property="og:image" :content="hotel?.images[0].image.url" />

    <Meta name="twitter:card" content="summary_large_image" />
    <Meta name="twitter:title" :content="hotel?.title" />
    <Meta
      name="twitter:description"
      :content="`Every info you need if staying at ${hotel?.title}`"
    />
    <Meta name="twitter:image" :content="hotel?.images[0].image.url" />
  </Head>

  <HotelSkeletonLoader v-if="pending" />
  <div v-else class="bg-light-100">
    <HotelHero :images="hotel?.images" />
    <HotelContent :hotel="hotel!" />
    <HotelAmenities v-if="hotel?.amenities" :amenities="hotel?.amenities" />
    <HotelSocialNetworks :socialLinks="hotel?.social_links" />
    <HotelContactFooter
      :startPrice="hotel?.start_price"
      :end-price="hotel?.end_price"
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
