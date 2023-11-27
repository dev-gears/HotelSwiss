<template>
  <h3 class="text-light mb-2 font-patuaOne text-lg leading-4">
    <NuxtLink :to="`/hotel/${hotelId}`">{{ title || "Not Found" }}</NuxtLink>
  </h3>
</template>

<script setup lang="ts">
defineProps<{
  hotelId: number;
  title: string;
}>();
</script>
