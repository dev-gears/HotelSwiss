<template>
  <div class="promo-block group relative mx-auto">
    <div class="container mx-auto px-3">
      <CommonBlockHeader :title="$t('PromoBlock.promoHotels')" />
    </div>
    <Swiper
      class="flex max-h-[650px] md:max-h-[500px] lg:max-h-[400px] xl:max-h-[500px]"
      :modules="[SwiperAutoplay, SwiperNavigation]"
      :slidesPerView="1.5"
      :centeredSlides="false"
      :spaceBetween="16"
      :autoHeight="false"
      :lazyPreloadPrevNext="3"
      :loop="false"
      :navigation="{
        nextEl: '.next-slide-button',
        prevEl: '.prev-slide-button',
      }"
      :breakpoints="responsiveOptions"
    >
      <SwiperSlide v-for="hotel in hotels" :key="hotel.id">
        <Card :hotel="hotel" aspect="square" :showAmenities="false" />
      </SwiperSlide>
      <div
        class="absolute left-0 top-0 z-40 hidden h-full w-9 items-start justify-center bg-light-100 lg:flex"
      >
        <button
          class="prev-slide-button flex w-5 items-center justify-center rounded"
        >
          <img src="~/assets/icons/prev-arrow.svg" alt="previous arrow" />
        </button>
      </div>
      <div
        class="absolute right-0 top-0 z-40 hidden h-full w-9 items-start justify-center bg-light-100 lg:flex"
      >
        <button
          class="next-slide-button flex w-5 items-center justify-center rounded"
        >
          <img src="~/assets/icons/next-arrow.svg" alt="next arrow" />
        </button>
      </div>
    </Swiper>
  </div>
</template>

<script setup>
import { ref } from "vue";

defineProps({
  hotels: {
    type: Array,
    required: true,
  },
});

const responsiveOptions = ref({
  768: {
    slidesPerView: 3,
    centeredSlides: false,
  },
  1024: {
    slidesPerView: 4,
    centeredSlides: false,
  },
});
</script>

<style>
.promo-block {
  @apply mb-5;

  .swiper {
    @apply md:container md:px-3 lg:px-10;
  }

  .swiper-wrapper {
    @apply px-3 pb-3 md:px-0;
  }

  .p-carousel-items-content {
    @apply max-sm:px-9;
  }

  .p-items-hidden .p-carousel-item {
    @apply visible;
  }

  .p-carousel-next.p-link,
  .p-carousel-prev.p-link {
    @apply mx-1.5 bg-primary text-light md:relative lg:h-28 lg:w-5 lg:rounded-none;
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
    @apply rounded-t-md !bg-primary;
  }

  .p-carousel-item {
    @apply flex items-center transition-all;
  }

  [data-p-carousel-item-active="false"] .card {
    @apply max-sm:scale-[96%];
  }

  .prev-slide-button,
  .next-slide-button {
    height: calc(100% - 12px);
    background-image: linear-gradient(
      180deg,
      rgba(53, 79, 82, 0.05) 0%,
      rgba(53, 79, 82, 0.4) 53.65%,
      rgba(53, 79, 82, 0.05) 100%
    );
  }
}
</style>
