<template>
  <div class="grid grid-cols-1 gap-4 lg:mt-5 lg:grid-cols-4">
    <div class="lg:col-span-2">
      <NuxtLink :to="getLink(0)">
        <Image
          :src="images[0].url"
          class="hero-image h-96 w-full object-cover transition-all hover:brightness-75 [&_img]:aspect-video [&_img]:rounded"
        />
      </NuxtLink>
    </div>

    <div
      class="grid grid-cols-1 gap-4 lg:col-span-2 lg:grid-cols-2 lg:grid-rows-2"
    >
      <template v-for="(data, index) in parsedImagesForCollage">
        <div :key="data.id" v-if="data?.renditions?.thumbnail">
          <NuxtLink :to="getLink(index + 1)">
            <Image
              :src="data.renditions.thumbnail"
              class="hero-image h-96 w-full object-cover transition-all hover:brightness-75 [&_img]:!aspect-video [&_img]:!h-full [&_img]:rounded [&_img]:object-cover"
            />
          </NuxtLink>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Image } from "@/types/hotel";
const { images, hotelId, hotelTitle } = defineProps({
  images: {
    type: Array<Image>,
    required: true,
    default: [],
  },
  hotelId: {
    type: Number,
    required: false,
  },
  hotelTitle: {
    type: String,
    required: false,
  },
});

const parsedImagesForCollage = computed(() => {
  const imagesWithThumbnail = images?.filter(
    (image) => image.renditions.thumbnail,
  );
  return imagesWithThumbnail?.slice(1, 5);
});

const getLink = (index: number) => ({
  name: "gallery",
  query: {
    images: JSON.stringify(images),
    hotelId: hotelId,
    hotelTitle: hotelTitle,
    index,
  },
});
</script>
