<template>
  <div class="container relative w-full">
    <CommonBackButton class="!absolute top-4 max-lg:!left-4 lg:!hidden" />
    <div v-if="images?.length && images[0]?.url">
      <HotelHeroImageCarousel
        v-if="deviceType !== 'desktop'"
        :images="parsedImagesWithFullPath"
        :hotelId="hotelId"
        :hotelTitle="hotelTitle"
      />
      <HotelHeroCollage
        v-else
        :images="parsedImagesWithFullPath"
        :hotelId="hotelId"
        :hotelTitle="hotelTitle"
        @openGallery="showGallery = true"
      />
    </div>
    <div v-else>
      <Image
        :src="Global.PLACEHOLDER_IMAGE_URL"
        class="hero-image mt-5 h-96 w-full rounded object-cover grayscale lg:h-full"
      />
    </div>
    <HotelHeroGallery
      v-model:visible="showGallery"
      :images="parsedImagesWithFullPath ?? null"
    />
  </div>
</template>

<script setup lang="ts">
import useDeviceType from "@/composables/useDeviceType";
import type { Image } from "@/types/hotel";
import { Global } from "@/enums/Global";
import HotelHeroGallery from "./Gallery.vue";

const { images } = defineProps({
  images: {
    type: Array<Image>,
  },
  hotelId: {
    type: Number,
    required: false,
  },
  hotelTitle: {
    type: String,
    required: false,
  },
  openImageModal: {
    type: Function,
    required: false,
  },
});

const showGallery = ref(false);

const runtimeConfig = useRuntimeConfig();
const backendUrl = runtimeConfig.public.backendUrl;

const parsedImagesWithFullPath = images?.map((image) => ({
  id: image.id,
  original: backendUrl + image.url,
  url: backendUrl + image.url,
  renditions: {
    thumbnail: image.renditions.thumbnail
      ? backendUrl + image.renditions.thumbnail
      : null,
  },
  title: image.title,
  width: image.width,
  height: image.height,
}));

const { deviceType } = useDeviceType();
</script>

<style>
.hero-image {
  img {
    @apply h-96 w-full object-cover lg:h-full;
  }
}
</style>
