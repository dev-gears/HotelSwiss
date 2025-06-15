<template>
  <div class="container mx-auto mb-5 overflow-x-hidden">
    <ClientOnly>
      <Carousel
        :items-to-show="3"
        :items-to-scroll="1"
        :navigation="true"
        :pagination="true"
        class="relative md:px-12"
        :gap="20"
        :navigationEnabled="true"
        :breakpoints="responsive"
      >
        <Slide
          v-for="(hotel, index) in hotels"
          :key="hotel.id"
          class="slide-card"
        >
          <Card
            :hotel="hotel"
            class="h-80"
            aspect="square"
            :showAmenities="false"
            :isLCPCandidate="index === 0"
          />
        </Slide>
        <template #addons>
          <Navigation>
            <template #prev>
              <CarouselNavButton direction="prev" class="absolute top-0" />
            </template>
            <template #next>
              <CarouselNavButton direction="next" class="absolute top-0" />
            </template>
          </Navigation>
        </template>
      </Carousel>
      <template #fallback>
        <div
          class="server-side-fallback grid grid-cols-2 grid-rows-1 gap-4 overflow-hidden pb-4 max-sm:w-max md:grid-cols-2 lg:grid-cols-4"
        >
          <div
            v-for="(hotel, index) in hotels"
            :key="hotel.id"
            class="slide-card hidden"
          >
            <Card
              :hotel="hotel"
              class="h-80"
              aspect="square"
              :showAmenities="false"
              :isLCPCandidate="index === 0"
            />
          </div>
        </div>
      </template>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import "vue3-carousel/carousel.css";
import { Carousel, Slide, Navigation } from "vue3-carousel";
import type { Hotel } from "~/types/hotel";
import Card from "../Card/Card.vue";
import CarouselNavButton from "./CarouselNavButton.vue";

defineProps({
  hotels: {
    type: Array as () => Hotel[],
    required: true,
  },
});

const responsive = {
  0: {
    itemsToShow: 1.3,
  },
  600: {
    itemsToShow: 2,
  },
  1024: {
    itemsToShow: 4,
  },
};
</script>

<style lang="pcss">
.server-side-fallback {
  @apply gap-5 overflow-hidden md:px-12;
  .slide-card:nth-child(1) {
    @apply block min-w-0 max-sm:grid max-sm:w-[76vw] max-sm:pl-3;
  }

  .slide-card:nth-child(2) {
    @apply block min-w-0 max-sm:grid max-sm:w-[76vw];
  }

  .slide-card:nth-child(3) {
    @apply lg:block;
  }
  .slide-card:nth-child(4) {
    @apply lg:block;
  }
}

.slide-card:nth-child(1) {
  @apply max-sm:pl-3;
}
.slide-card:last-child {
  @apply max-sm:pr-3;
}

.carousel__next {
  @apply right-0 h-4/5;
}
.carousel__prev {
  @apply left-0 h-4/5;
}
</style>
