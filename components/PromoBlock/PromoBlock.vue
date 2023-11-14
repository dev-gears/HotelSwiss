<template>
  <div class="promo-block container relative mx-auto">
    <CommonBlockHeader title="Promo hotels" class="px-3" />
    <Swiper
      :modules="[SwiperAutoplay]"
      :slidesPerView="1.3"
      :centeredSlides="true"
      :spaceBetween="20"
      :autoHeight="false"
      :breakpoints="responsiveOptions"
      :autoplay="{
        delay: 3000,
        disableOnInteraction: true,
      }"
    >
      <SwiperSlide v-for="hotel in hotels" :key="hotel.id">
        <CardPromoCard :hotel="hotel" />
      </SwiperSlide>
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
    spaceBetween: 20,
    centeredSlides: false,
  },
  1024: {
    centeredSlides: false,
    slidesPerView: 4,
    spaceBetween: 20,
  },
});
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
