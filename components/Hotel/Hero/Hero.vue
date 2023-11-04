<template>
  <div class="relative w-full">
    <Button
      icon="pi pi-arrow-left"
      @click="$router.back()"
      class="absolute left-4 top-4 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-primary-500/50 p-4 text-secondary-800 shadow-primary-500"
    />
    <Image
      preview
      :src="imageSource"
      class="hero-image h-96 w-full lg:h-[500px]"
    />
    <ClientOnly>
      <ThumbnailSlider
        :images="images"
        :currentImageUrl="imageSource"
        :updateImageSource="updateImageSource"
      />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import ThumbnailSlider from "./ThumbnailSlider.vue";
import { HotelImage } from "@/types/hotel";

const { imageUrl, title, images } = defineProps({
  imageUrl: {
    type: String,
  },
  title: {
    type: String,
  },
  images: {
    type: Array<HotelImage>,
  },
});

const imageSource = ref(images[0].image.url || imageUrl);

const updateImageSource = (image: string) => {
  imageSource.value = image;
};
</script>

<style>
.hero-image {
  img {
    @apply h-96 w-full rounded-b-3xl object-cover shadow-md shadow-primary-500 lg:h-full lg:rounded-b-xl;
  }
}
.p-image-toolbar svg {
  @apply !text-secondary-600;
}
</style>
