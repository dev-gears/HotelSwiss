<template>
  <div class="container relative w-full">
    <CommonBackButton class="!absolute top-4 max-lg:!left-4 lg:!hidden" />
    <div v-if="images?.length && images[0]?.url">
      <ImageCarousel
        class="block md:hidden"
        :images="parsedImagesWithFullPath"
        :hotelId="hotelId"
        :hotelTitle="hotelTitle"
      />
      <Collage
        class="hidden md:grid"
        :images="parsedImagesWithFullPath"
        :hotelId="hotelId"
        :hotelTitle="hotelTitle"
        @openGallery="showGallery = true"
      />
    </div>
    <div v-else>
      <Image
        :src="Global.PLACEHOLDER_IMAGE_URL"
        class="fallback-image mt-5 !h-96 w-full rounded object-cover grayscale"
      />
    </div>
    <HotelHeroGallery
      v-model:visible="showGallery"
      :images="parsedImagesWithFullPath ?? []"
    />
  </div>
</template>

<script setup lang="ts">
import type { Image } from "@/types/hotel";
import { Global } from "@/enums/Global";
import HotelHeroGallery from "./Gallery.vue";
import Collage from "./Collage.vue";
import ImageCarousel from "./ImageCarousel.vue";

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

const parsedImagesWithFullPath = computed(() =>
  images?.map(
    (image) =>
      ({
        id: image.id,
        url: backendUrl + image.url,
        renditions: {
          thumbnail: image.renditions.thumbnail
            ? backendUrl + image.renditions.thumbnail
            : undefined,
          medium: image.renditions.medium
            ? backendUrl + image.renditions.medium
            : undefined,
          large: image.renditions.large
            ? backendUrl + image.renditions.large
            : undefined,
        },
        title: image.title,
        width: image.width,
        height: image.height,
      }) satisfies Image,
  ),
);
</script>

<style>
.fallback-image img {
  height: 24rem !important; /* h-96 */
  width: 100% !important;
  object-fit: cover !important;
}

@media (min-width: 1024px) {
  .fallback-image img {
    height: 100% !important; /* lg:h-full */
  }
}
</style>
