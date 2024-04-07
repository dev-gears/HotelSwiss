<template>
  <h3 class="mb-2 font-patuaOne text-lg leading-4 text-light">
    <NuxtLink :to="`/hotel/${hotelId}`">{{ title }}</NuxtLink>
  </h3>
</template>

<script setup lang="ts">
import { Global } from "@/enums/Global";
defineProps<{
  hotelId: number;
  title: string;
}>();
</script>
