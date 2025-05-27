<template>
  <div
    class="grid grid-cols-1 gap-4 transition-colors md:grid-cols-4 lg:mt-5"
    @click="emit('openGallery')"
  >
    <div class="md:col-span-2">
      <Image
        @click="emit('openGallery')"
        :src="images[0]?.url ?? undefined"
        class="hero-image h-96 w-full cursor-pointer object-cover transition-all hover:brightness-75 [&_img]:aspect-video [&_img]:rounded"
      />
    </div>

    <div
      class="grid grid-cols-1 gap-4 md:col-span-2 md:grid-cols-2 md:grid-rows-2"
    >
      <template v-for="(data, index) in parsedImagesForCollage">
        <div :key="data.id" v-if="data?.renditions?.thumbnail">
          <Image
            @click="emit('openGallery')"
            :src="data.renditions.thumbnail"
            class="hero-image h-96 w-full cursor-pointer object-cover transition-all hover:brightness-75 [&_img]:!aspect-video [&_img]:!h-full [&_img]:rounded [&_img]:object-cover"
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

const emit = defineEmits(["openGallery"]);

const parsedImagesForCollage = computed(() => {
  const imagesWithThumbnail = props.images?.filter(
    (image) => image.renditions.thumbnail,
  );
  return imagesWithThumbnail?.slice(1, 5);
});
</script>
