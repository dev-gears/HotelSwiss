<template>
  <div class="bg-light-100 min-h-screen p-4 pt-16">
    <div class="container relative mx-auto">
      <Gallery :images="parsedImages" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
const router = useRoute();
const { images } = router.query;
const parsedImages = JSON.parse(images as string);
</script>
