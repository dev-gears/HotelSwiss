<template>
  <h3
    class="mb-2 min-h-max font-patuaOne text-lg capitalize leading-4 text-light"
  >
    <NuxtLink :to="`/hotel/${hotelId}`">{{ title }}</NuxtLink>
  </h3>
</template>

<script setup lang="ts">
defineProps<{
  hotelId: number;
  title: string;
}>();
</script>
