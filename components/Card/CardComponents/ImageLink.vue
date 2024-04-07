<template>
  <NuxtLink class="fallback-background" :to="`/hotel/${hotelId}`">
    <img
      ref="imageRef"
      @error="handleError"
      class="h-full w-full rounded-br-[60px] object-cover shadow-cardImage"
      :src="setImageSrc"
      :alt="`Image of ${title}`"
    />
  </NuxtLink>
</template>

<script setup lang="ts">
import { Global } from "@/enums/Global";

const props = defineProps<{
  hotelId: number;
  imageUrl: string | undefined;
  title: string;
  backendUrl: string;
}>();

const imageRef = ref<HTMLImageElement | null>(null);
const setImageSrc = computed(() => {
  if (!props.imageUrl) {
    imageRef.value?.classList.add("object-contain");
    imageRef.value?.classList.remove("object-cover");
    return Global.PLACEHOLDER_IMAGE_URL;
  }
  return props.backendUrl + props.imageUrl;
});

/**
 * Handle image loading error
 * Replace the image with a placeholder image
 * Add object-contain class to the image
 * Remove object-cover class from the image
 * @returns void
 */
const handleError = (): void => {
  imageRef.value?.setAttribute("src", Global.PLACEHOLDER_IMAGE_URL);
  imageRef.value?.classList.add("object-contain");
  imageRef.value?.classList.remove("object-cover");
};
</script>
