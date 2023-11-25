<template>
  <NuxtLink :to="`/hotel/${hotelId}`">
    <img
      class="h-full w-full rounded-br-[60px] object-cover shadow-cardImage"
      :src="`${backendUrl}${imageUrl}` || '~/assets/images/placeholder.jpg'"
      :alt="`Image of ${title}`"
    />
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
  hotelId: number;
  imageUrl: string;
  title: string;
  backendUrl: string;
}>();
</script>
