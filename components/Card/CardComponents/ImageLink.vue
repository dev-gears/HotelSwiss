<template>
  <NuxtLink class="fallback-background" :to="`/hotel/${hotelId}`">
    <NuxtImg
      :placeholder="Global.PLACEHOLDER_IMAGE_URL"
      loading="lazy"
      class="h-full w-full rounded-br-[60px] object-cover shadow-cardImage"
      :src="backendUrl + imageUrl"
      :alt="`Image of ${title}`"
    />
  </NuxtLink>
</template>

<script setup lang="ts">
import { Global } from "@/enums/Global";

defineProps<{
  hotelId: number;
  imageUrl: string | undefined;
  title: string;
  backendUrl: string;
}>();
</script>
