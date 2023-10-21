<template>
  <div
    class="thumbnail-carousel absolute bottom-0 right-5 w-24 translate-y-12 lg:w-2/4 lg:translate-y-2/4"
    :class="isMobile ? 'mobile' : 'desktop'"
  >
    <CommonBackdrop
      class="rounded-md bg-gradient-to-b from-transparent from-0% via-primary-500 via-50% to-transparent to-100% px-1 max-lg:bg-transparent"
    >
      <Carousel
        :value="extendedImages"
        :circular="images ? images?.length > 3 : false"
        :orientation="isMobile ? 'vertical' : 'horizontal'"
        :verticalViewPortHeight="carouselHeight() + 'px'"
        :numVisible="3"
        :numScroll="2"
        :showIndicators="false"
      >
        <template #item="image">
          <HotelHeroCarouselCard
            :imageUrl="image.data.thumbnailImageSrc"
            :imageAlt="image.data.alt"
            :clickHandler="updateImageSource"
            :selected="currentImageUrl === image.data.itemImageSrc"
          />
        </template>
      </Carousel>
    </CommonBackdrop>
  </div>
</template>

<script setup lang="ts">
const { images } = defineProps({
  images: {
    type: Array,
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
.thumbnail-carousel {
  .p-link {
    @apply z-10 rounded-none max-lg:absolute max-lg:w-full;
  }

  &.mobile {
    .p-link {
      &.p-carousel-prev {
        @apply top-0 rounded-t-md;
      }

      &.p-carousel-next {
        @apply bottom-0 rounded-b-md;
      }
    }

    .p-carousel-item-active {
      &:first-of-type {
        @apply border-4 border-primary-500;
      }
    }
  }
}
</style>
