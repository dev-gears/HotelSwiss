<template>
  <h3 class="mb-2 font-patuaOne text-lg leading-4 text-white">
    <NuxtLink :to="`/hotel/${hotelId}`">{{ title }}</NuxtLink>
  </h3>
</template>

<script setup lang="ts">
defineProps<{
  hotelId: number;
  title: string;
}>();
</script>
