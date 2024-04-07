<template>
  <h3 class="mb-2 font-patuaOne text-lg capitalize leading-4 text-light">
    <NuxtLink :to="`/hotel/${hotelId}`">{{ title || "Not Found" }}</NuxtLink>
  </h3>
</template>

<script setup lang="ts">
defineProps<{
  hotelId: number;
  title: string;
}>();
</script>
