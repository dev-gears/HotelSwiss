<template>
  <div class="promo-block relative mx-auto">
    <div class="container mx-auto px-3">
      <CommonBlockHeader :title="$t('PromoBlock.promoHotels')" />
    </div>
    <Swiper
      class="flex max-h-[750px] overflow-hidden rounded-xl max-md:!pr-6 md:max-h-[500px] lg:max-h-[400px] xl:max-h-[700px]"
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
      <SwiperSlide
        ref="swiperSlide"
        :style="slideStyle"
        v-for="hotel in hotels"
        :key="hotel.id"
        class="swiper-slide-card"
      >
        <Card :hotel="hotel" aspect="square" :showAmenities="false" />
      </SwiperSlide>
      <div
        class="absolute left-0 top-0 z-40 hidden h-full w-9 items-center justify-center rounded-xl bg-primary shadow dark:bg-dark-200 lg:flex"
      >
        <button
          v-ripple
          class="prev-slide-button flex w-5 items-center justify-center rounded"
        >
          <img
            src="~/assets/icons/prev-arrow.svg"
            alt="previous arrow"
            class="dark:opacity-80 dark:invert"
          />
        </button>
      </div>
      <div
        class="absolute right-0 top-0 z-40 hidden h-full w-9 items-center justify-center rounded-xl bg-primary shadow dark:bg-dark-200 lg:flex"
      >
        <button
          v-ripple
          class="next-slide-button flex w-5 items-center justify-center rounded"
        >
          <img
            src="~/assets/icons/next-arrow.svg"
            alt="next arrow"
            class="dark:opacity-80 dark:invert"
          />
        </button>
      </div>
    </Swiper>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Card from "../Card/Card.vue";

const props = defineProps({
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

/**
 * Inline style for the slide.
 * This is added to prevent content mismatch before the component is mounted.
 * Since the content is rendered server-side.
 */
const slideStyle = ref("max-width: 250px; margin-right: 15px;");

onMounted(() => {
  slideStyle.value = "";
});
</script>

<style>
.promo-block {
  @apply mb-5;

  .swiper {
    @apply md:container md:px-3 lg:px-10;
  }

  .p-carousel-items-content {
    @apply max-sm:px-9;
  }

  .p-items-hidden .p-carousel-item {
    @apply visible;
  }

  .p-carousel-next.p-link,
  .p-carousel-prev.p-link {
    @apply mx-1.5 bg-primary text-light dark:bg-primary-200 md:relative lg:h-28 lg:w-5 lg:rounded-none;
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
    @apply rounded-t-md !bg-primary dark:!bg-primary;
  }

  .p-carousel-item {
    @apply flex items-center;
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

    @media (prefers-color-scheme: dark) {
      background-image: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.05) 0%,
        rgba(255, 255, 255, 0.2) 53.65%,
        rgba(255, 255, 255, 0.05) 100%
      );
    }
  }
}
</style>
