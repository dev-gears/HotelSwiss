<template>
  <div
    class="thumbnail-carousel absolute bottom-0 right-5 w-28 translate-y-12 lg:w-2/4 lg:translate-y-2/4"
    :class="isMobile ? 'mobile' : 'desktop'"
  >
    <CommonBackdrop
      class="backdrop relative flex h-[350px] items-center rounded-md px-[2px] py-0"
    >
      <Swiper
        class="h-[300px] w-full"
        :spaceBetween="30"
        :slidesPerView="2.5"
        :autoHeight="false"
        :slideToClickedSlide="true"
        :direction="isMobile ? 'vertical' : 'horizontal'"
      >
        <SwiperSlide v-for="(image, index) in images" :key="index">
          <HotelHeroCarouselCard
            v-if="image.image.url"
            :imageUrl="image.image.url"
            :imageAlt="image.image.title"
            :clickHandler="updateImageSource"
            :selected="currentImageUrl === image.image.url"
          />
        </SwiperSlide>
      </Swiper>
    </CommonBackdrop>
  </div>
</template>

<script setup lang="ts">
import { HotelImage } from "@/types/hotel";
const { images } = defineProps({
  images: {
    type: Array<HotelImage>,
  },
  updateImageSource: {
    type: Function as PropType<(image: string) => void>,
  },
  currentImageUrl: {
    type: String,
  },
});

const isMobile = computed(() => window.innerWidth < 1024);

/**
 * If there are less than 6 images, we want to duplicate the images so that the carousel
 * can be circular.
 */
const extendedImages = computed(() => {
  if (images?.length && images?.length < 6) {
    return [...images, ...images];
  } else {
    return images;
  }
});

/**
 * If there are less than 4 images, we want to set the height of the carousel to the
 * number of images * 100px. Otherwise, we want to set the height to 300px.
 */
const carouselHeight = () => {
  if (images?.length && images.length < 4) {
    return images.length * 100;
  } else {
    return 300;
  }
};
</script>

<style>
.backdrop {
  background: linear-gradient(
    180deg,
    rgba(53, 79, 82, 0) 0%,
    rgba(53, 79, 82, 0.7) 5%,
    rgba(53, 79, 82, 1) 15%,
    rgba(53, 79, 82, 0.7) 50%,
    rgba(53, 79, 82, 0.7) 80%,
    rgba(255, 255, 255, 0) 100%
  );
}
</style>
