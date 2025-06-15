<template>
  <div
    class="grid grid-cols-1 gap-4 transition-colors md:grid-cols-4 lg:mt-5"
    @click="emit('openGallery')"
  >
    <div class="md:col-span-2">
      <NuxtImg
        @click="emit('openGallery')"
        :src="images[0]?.url ?? undefined"
        preset="hero"
        loading="eager"
        fetchpriority="high"
        :preload="true"
        sizes="(max-width: 768px) 100vw, 50vw"
        class="flex h-full w-full cursor-pointer object-cover transition-all hover:brightness-75 [&_img]:aspect-video [&_img]:rounded"
      />
    </div>
    <div
      class="grid grid-cols-1 gap-4 md:col-span-2 md:grid-cols-2 md:grid-rows-2"
    >
      <template v-for="(data, index) in parsedImagesForCollage" :key="data.id">
        <div v-if="data?.renditions?.thumbnail">
          <NuxtImg
            @click="emit('openGallery')"
            :src="data.renditions.thumbnail"
            :alt="`Hotel image ${index + 2}`"
            preset="thumbnail"
            loading="lazy"
            sizes="(max-width: 768px) 50vw, 25vw"
            class="flex h-full w-full cursor-pointer object-cover transition-all hover:brightness-75 [&_img]:!aspect-video [&_img]:!h-full [&_img]:rounded [&_img]:object-cover"
          />
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Image } from "@/types/hotel";

const props = defineProps({
  images: {
    type: Array<Image>,
    required: true,
    default: () => [],
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

const emit = defineEmits<{
  openGallery: [];
}>();

const parsedImagesForCollage = computed(() => {
  const imagesWithThumbnail = props.images?.filter(
    (image) => image.renditions?.thumbnail,
  );
  return imagesWithThumbnail?.slice(1, 5) || [];
});
</script>
