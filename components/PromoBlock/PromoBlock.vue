<template>
  <PromoBlockSkeletonLoader v-if="isLoading" />
  <div class="container relative mx-auto" v-else>
    <CommonBlockHeader title="Featured hotels" class="px-3" />
    <Carousel
      v-if="!isLoading"
      :value="hotels"
      :circular="true"
      :numVisible="4"
      :numScroll="4"
      :autoplayInterval="5000"
      :showIndicators="false"
      :responsiveOptions="responsiveOptions"
    >
      <template #item="hotel">
        <CardPromoCard :hotel="hotel.data" class="m-2" />
      </template>
    </Carousel>
    <div v-else>
      <Loader />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useHotelService } from "@/services/useHotelService";
import { useFetchData } from "@/composables/useFetchData";

const { fetchHotels, hotels } = useHotelService();
const { isLoading } = useFetchData(fetchHotels, hotels);

const responsiveOptions = ref([
  {
    breakpoint: "1199px",
    numVisible: 3,
    numScroll: 3,
  },
  {
    breakpoint: "991px",
    numVisible: 3,
    numScroll: 2,
  },
  {
    breakpoint: "767px",
    numVisible: 1,
    numScroll: 1,
  },
]);
</script>

<style>
.promo-block {
  @apply mb-20;

  .p-carousel-items-content {
    @apply max-sm:px-9;
  }

  .p-items-hidden .p-carousel-item {
    @apply visible;
  }

  .p-carousel-next.p-link,
  .p-carousel-prev.p-link {
    @apply mx-1.5 bg-primary-500 text-secondary-600 md:relative lg:h-28 lg:w-5 lg:rounded-none;
    @apply max-sm:absolute max-sm:bottom-0 max-sm:translate-y-10 max-sm:transform;
  }

  .p-carousel-next.p-link {
    @apply max-sm:right-[35%] lg:rounded-r;
  }

  .p-carousel-prev.p-link {
    @apply max-sm:left-[38%] lg:rounded-l;
  }

  .p-highlight {
    @apply rounded-t-2xl;
  }

  .p-highlight > a {
    @apply rounded-t-md !bg-primary-900;
  }

  .p-carousel-item {
    @apply flex items-center transition-all;
  }

  [data-p-carousel-item-active="false"] .card {
    @apply max-sm:scale-[96%];
  }
}
</style>
