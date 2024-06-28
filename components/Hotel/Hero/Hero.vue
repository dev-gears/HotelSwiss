<template>
  <div class="container relative w-full">
    <CommonBackButton class="absolute left-4 top-4" />
    <div v-if="images?.length && images[0]?.image?.url">
      <HotelHeroCarousel v-if="deviceType !== 'desktop'" :images="images" />
      <HotelHeroCollage v-else :images="images" />
    </div>
    <div v-else>
      <Image
        :src="Global.PLACEHOLDER_IMAGE_URL"
        class="hero-image mt-5 h-96 w-full rounded object-cover grayscale lg:h-full"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import useDeviceType from "@/composables/useDeviceType";
import type { ImageWrapper } from "@/types/hotel";
import { Global } from "@/enums/Global";

const { images } = defineProps({
  images: {
    type: Array<ImageWrapper>,
  },
});

const { deviceType } = useDeviceType();
</script>

<style>
.hero-image {
  img {
    @apply h-96 w-full object-cover lg:h-full;
  }
}
</style>
