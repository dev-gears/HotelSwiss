<template>
  <div class="promo-block relative mx-auto">
    <CommonBlockHeader title="Promo hotels" class="px-3 md:px-0" />
    <Swiper
      :modules="[SwiperAutoplay, SwiperNavigation]"
      :slidesPerView="1.5"
      :centeredSlides="false"
      :spaceBetween="16"
      :autoHeight="false"
      :loop="false"
      :navigation="{
        nextEl: '.next-slide-button',
        prevEl: '.prev-slide-button',
      }"
      :breakpoints="responsiveOptions"
      :autoplay="{
        delay: 4000,
        disableOnInteraction: true,
      }"
    >
      <SwiperSlide v-for="hotel in hotels" :key="hotel.id">
        <Card :hotel="hotel" aspect="square" :showAmenities="false" />
      </SwiperSlide>
      <div class="flex w-full items-center justify-center gap-3 max-lg:hidden">
        <button
          class="prev-slide-button flex h-[36px] w-[36px] items-center justify-center rounded-full bg-primary"
        >
          <img
            class="translate-x-[-2px]"
            src="~/assets/icons/prev-arrow.svg"
            alt="previous arrow"
          />
        </button>
        <button
          class="next-slide-button flex h-[36px] w-[36px] items-center justify-center rounded-full bg-primary"
        >
          <img
            class="translate-x-[2px]"
            src="~/assets/icons/next-arrow.svg"
            alt="next arrow"
          />
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

  .swiper-wrapper {
    @apply px-3 md:px-0;
  }

  .p-carousel-items-content {
    @apply max-sm:px-9;
  }

  .p-items-hidden .p-carousel-item {
    @apply visible;
  }

  .p-carousel-next.p-link,
  .p-carousel-prev.p-link {
    @apply text-light mx-1.5 bg-primary md:relative lg:h-28 lg:w-5 lg:rounded-none;
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
}
</style>
