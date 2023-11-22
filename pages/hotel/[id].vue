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

  <HotelSkeletonLoader v-if="isLoading" />
  <div v-else>
    <HotelHero :images="hotel?.images" />
    <HotelContent :hotel="hotel!" />
    <HotelAmenities v-if="hotel?.amenities" :amenities="hotel?.amenities" />
  </div>
</template>

<script setup lang="ts">
import { useHotelService } from "@/services/useHotelService";
import { useFetchData } from "@/composables/useFetchData";

definePageMeta({
  layout: "single",
});
const route = useRoute();

const { fetchHotelById, hotel } = useHotelService();
const { isLoading } = useFetchData(
  () => fetchHotelById(`${route.params.id}`),
  hotel,
);
</script>
