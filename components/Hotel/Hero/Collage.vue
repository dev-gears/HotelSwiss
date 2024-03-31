<template>
  <div class="grid grid-cols-1 gap-4 lg:mt-5 lg:grid-cols-4">
    <div class="lg:col-span-3">
      <NuxtLink :to="getLink(0)">
        <Image
          :src="backendUrl + images[0].image.renditions.large"
          class="hero-image h-96 w-full object-cover transition-all hover:brightness-75 [&_img]:aspect-video [&_img]:rounded"
        />
      </NuxtLink>
    </div>

    <div class="grid grid-cols-1 gap-4 lg:col-span-1">
      <div v-for="(data, index) in images.slice(1, 4)" :key="data.image.id">
        <NuxtLink :to="getLink(index + 1)">
          <Image
            :src="backendUrl + data.image.renditions.medium"
            class="hero-image h-96 w-full object-cover transition-all hover:brightness-75 [&_img]:!aspect-video [&_img]:!h-full [&_img]:rounded [&_img]:object-cover"
          />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ImageWrapper } from "@/types/hotel";
const { images } = defineProps({
  images: {
    type: Array<ImageWrapper>,
    required: true,
  },
});

const runtimeConfig = useRuntimeConfig();
const backendUrl = runtimeConfig.public.backendUrl;

const getLink = (index: number) => ({
  name: "gallery",
  query: {
    images: JSON.stringify(images),
    index,
  },
});
</script>
